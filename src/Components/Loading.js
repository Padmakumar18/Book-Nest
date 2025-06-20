import "./CssFile/Loading.css";
import { motion } from "framer-motion";

function Loading() {
  return (
    <div className="loading-container">
      <motion.div
        className="logo"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        📚 <span className="brand">LibraStack</span>
      </motion.div>

      <motion.div
        className="dots"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </motion.div>

      <p className="tagline">Organizing your library, the smart way</p>
    </div>
  );
}

export default Loading;