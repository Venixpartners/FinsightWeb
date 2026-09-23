export default function PageIntro({ title, description, children }) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-350 px-5 py-10 sm:px-7">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">{title}</h1>
        {description && (
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">{description}</p>
        )}
        {children}
      </div>
    </section>
  );
}
