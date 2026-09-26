export default function BackgroundDecor() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      {/* Blueprint grid, fading out towards the bottom */}
      <div className="blueprint absolute inset-0 opacity-60 mask-[linear-gradient(to_bottom,black,transparent_70%)]" />
      {/* Cold cyan bloom top-right, warm ember bloom low-left */}
      <div className="absolute -top-48 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-cyan/10 blur-[140px]" />
      <div className="absolute bottom-[-20%] left-[-10%] h-[30rem] w-[30rem] rounded-full bg-ember/[0.06] blur-[140px]" />
    </div>
  );
}
