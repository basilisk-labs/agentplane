#!/usr/bin/env python3
"""Execute one process inside an inherited Linux filesystem boundary.

The trusted host supplies a policy file. No policy is read from candidate code.
This wrapper never reads credentials. Existing managed authentication is a host
runtime allowlist decision. Landlock ABI 4 and x86_64 seccomp are required.
"""
import ctypes
import json
import os
import platform
import sys

libc = ctypes.CDLL(None, use_errno=True)


def checked(value, operation):
    if value < 0:
        error = ctypes.get_errno()
        raise OSError(error, operation)
    return value


class Ruleset(ctypes.Structure):
    _fields_ = [("handled_access_fs", ctypes.c_uint64)]


class PathBeneath(ctypes.Structure):
    _pack_ = 1
    _fields_ = [("allowed_access", ctypes.c_uint64), ("parent_fd", ctypes.c_int32)]


class Filter(ctypes.Structure):
    _fields_ = [("code", ctypes.c_ushort), ("jt", ctypes.c_ubyte),
                ("jf", ctypes.c_ubyte), ("k", ctypes.c_uint)]


class Program(ctypes.Structure):
    _fields_ = [("length", ctypes.c_ushort), ("filters", ctypes.POINTER(Filter))]


def restrict_syscalls(network):
    # No x32/alternate-architecture bypass. Deny host IPC and operations that
    # could acquire another process's descriptors or memory. socketpair remains
    # available for private communication between descendants.
    instructions = [(0x20, 0, 0, 4), (0x15, 1, 0, 0xC000003E),
                    (0x06, 0, 0, 0x80000000), (0x20, 0, 0, 0),
                    (0x45, 0, 1, 0x40000000), (0x06, 0, 0, 0x80000000)]
    denied = [62, 101, 109, 112, 200, 234, 304, 310, 311, 321, 424, 425, 426, 427, 438]
    if network == "deny":
        denied += [41, 42, 49, 50, 43, 288]
    for number in denied:
        instructions += [(0x15, 0, 1, number), (0x06, 0, 0, 0x00050001)]
    # socket(AF_UNIX, ...) is forbidden. No inherited host sockets survive.
    instructions += [(0x15, 0, 3, 41), (0x20, 0, 0, 16),
                     (0x15, 0, 1, 1), (0x06, 0, 0, 0x00050001),
                     (0x06, 0, 0, 0x7FFF0000)]
    array = (Filter * len(instructions))(*(Filter(*row) for row in instructions))
    program = Program(len(array), array)
    checked(libc.prctl(22, 2, ctypes.byref(program), 0, 0), "seccomp")


def main():
    if platform.system() != "Linux" or platform.machine() != "x86_64":
        raise RuntimeError("Qualified Linux x86_64 runtime required")
    policy = json.loads(open(sys.argv[1], encoding="utf8").read())
    command = sys.argv[2:]
    if not command or policy.get("network") not in ("deny", "provider"):
        raise RuntimeError("Explicit command and network policy required")
    abi = checked(libc.syscall(444, 0, 0, 1), "Landlock ABI")
    if abi < 4:
        raise RuntimeError("Landlock ABI 4 required")
    # Drop all inherited non-stdio descriptors before constructing the ruleset.
    for name in os.listdir("/proc/self/fd"):
        fd = int(name)
        if fd > 2:
            try:
                os.close(fd)
            except OSError:
                pass
    handled = (1 << 15) - 1
    ruleset = Ruleset(handled)
    ruleset_fd = checked(libc.syscall(444, ctypes.byref(ruleset), ctypes.sizeof(ruleset), 0), "create ruleset")
    read = (1 << 0) | (1 << 2) | (1 << 3)
    for access, names in ((read, policy["read_only"]), (handled, policy["writable"])):
        for name in names:
            canonical = os.path.realpath(name)
            if canonical != os.path.abspath(name):
                raise RuntimeError("Allowlist path must be canonical")
            fd = os.open(canonical, os.O_PATH | os.O_CLOEXEC)
            rights = access
            if not os.path.isdir(canonical):
                rights &= (1 << 0) | (1 << 1) | (1 << 2) | (1 << 14)
            rule = PathBeneath(rights, fd)
            checked(libc.syscall(445, ruleset_fd, 1, ctypes.byref(rule), 0), "add path rule")
            os.close(fd)
    checked(libc.prctl(38, 1, 0, 0, 0), "no_new_privs")
    checked(libc.syscall(446, ruleset_fd, 0), "restrict self")
    os.close(ruleset_fd)
    restrict_syscalls(policy["network"])
    os.chdir(policy["cwd"])
    os.execv(command[0], command)


if __name__ == "__main__":
    main()
