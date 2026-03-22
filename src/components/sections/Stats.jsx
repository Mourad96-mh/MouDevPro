import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const CountUp = ({ target, suffix, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let current = 0;
    const steps = 60;
    const increment = target / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 25);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return <span>{count}{suffix}</span>;
};

const Stats = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const stats = [
    { value: 30, suffix: "+", label: t("stats.clients") },
    { value: 45, suffix: "+", label: t("stats.projects") },
    { value: 4, suffix: "+", label: t("stats.experience") },
    { value: 100, suffix: "%", label: t("stats.satisfaction") },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`stats${isVisible ? " stats--visible" : ""}`} ref={ref}>
      <div className="stats__container container">
        {stats.map((stat, i) => (
          <div key={i} className="stat__item" style={{ "--stat-delay": `${i * 0.12}s` }}>
            <p className="stat__value">
              <CountUp target={stat.value} suffix={stat.suffix} isVisible={isVisible} />
            </p>
            <p className="stat__label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
