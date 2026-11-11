
import { useEffect } from "react";
import "./GlobalButtonEffects.css";

export default function GlobalButtonEffects() {
  useEffect(() => {
    function handleClick(event) {
      const button = event.target.closest("button");

        if (
        !button ||
        button.disabled ||
        button.classList.contains("boxd-add-button")
        ) {
        return;
        }

      // Add a fresh bounce on every click.
      button.classList.remove("boxd-global-pop");

      // Restart CSS animation.
      void button.offsetWidth;

      button.classList.add("boxd-global-pop");

      // Create a small burst of shapes.
      if (
        !button.classList.contains("boxd-add-button") &&
        !window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
      ) {
        createBurst(button);
      }
    }

    function createBurst(button) {
      const rect = button.getBoundingClientRect();

      const burst = document.createElement("div");
      burst.className = "boxd-global-burst";

      burst.style.left = `${
        rect.left + rect.width / 2
      }px`;

      burst.style.top = `${
        rect.top + rect.height / 2
      }px`;

      const colors = [
        "#FF7043",
        "#F4BE46",
        "#294B3B",
      ];

      for (let i = 0; i < 5; i++) {
        const piece = document.createElement("span");

        piece.className = "boxd-global-piece";

        const angle = (Math.PI * 2 * i) / 5;
        const distance = 30 + Math.random() * 20;

        piece.style.setProperty(
          "--x",
          `${Math.cos(angle) * distance}px`
        );

        piece.style.setProperty(
          "--y",
          `${Math.sin(angle) * distance}px`
        );

        piece.style.background =
          colors[i % colors.length];

        burst.appendChild(piece);
      }

      document.body.appendChild(burst);

      burst.addEventListener(
        "animationend",
        () => burst.remove(),
        { once: true }
      );
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener(
        "click",
        handleClick
      );
    };
  }, []);

  return null;
}
