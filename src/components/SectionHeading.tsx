import Reveal from "./Reveal";

interface Props {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className = "",
}: Props) {
  const alignment =
    align === "center" ? "text-center mx-auto items-center" : "text-left";
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment} ${className}`}>
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="text-3xl font-semibold leading-[1.1] text-ink md:text-4xl lg:text-5xl">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className="text-lg leading-relaxed text-fog">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
