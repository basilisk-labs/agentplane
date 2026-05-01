FROM node:24-alpine

ARG AGENTPLANE_VERSION
ARG AGENTPLANE_TARBALL_FILE=.agentplane/.release/publish/ghcr/agentplane.tgz
ARG AGENTPLANE_TARBALL_SHA256_FILE=.agentplane/.release/publish/ghcr/agentplane.tgz.sha256

COPY ${AGENTPLANE_TARBALL_FILE} /tmp/agentplane.tgz
COPY ${AGENTPLANE_TARBALL_SHA256_FILE} /tmp/agentplane.tgz.sha256

RUN cd /tmp \
  && sha256sum -c agentplane.tgz.sha256 \
  && npm install -g /tmp/agentplane.tgz \
  && rm /tmp/agentplane.tgz \
  && if [ -n "${AGENTPLANE_VERSION}" ]; then agentplane --version | grep -Fx "${AGENTPLANE_VERSION}"; else agentplane --version; fi

ENTRYPOINT ["agentplane"]
CMD ["--help"]
