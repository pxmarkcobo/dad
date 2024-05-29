import RegistrationForm from "./_components/form"

export default function Registration() {
  return (
    <section className="mx-auto my-4 max-w-screen-md px-4 antialiased 2xl:px-0">
      <h1 className="text-center text-xl font-bold text-gray-900 dark:text-white">
        Member Registration
      </h1>
      <RegistrationForm />
    </section>
  )
}
