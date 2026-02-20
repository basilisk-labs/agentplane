import Layout from "@theme/Layout";
import styles from "./index.module.css";

export default function BlogLanding() {
  return (
    <Layout
      title="Blog"
      description="AgentPlane blog redesign in progress and upcoming release stories."
    >
      <main className={styles.wrap}>
        <section className={styles.hero}>
          <p className={styles.kicker}>AgentPlane Journal</p>
          <h1>Blog redesign in progress</h1>
          <p className={styles.lead}>
            We are preparing a brighter, minimal blog format. New posts will return with release
            stories and implementation notes.
          </p>
        </section>

        <section className={styles.card}>
          <h2>Planned next post</h2>
          <p>
            <strong>Release 0.2.25:</strong> safer commit scope, stronger publish gates, and cleaner
            documentation checks.
          </p>
        </section>
      </main>
    </Layout>
  );
}
