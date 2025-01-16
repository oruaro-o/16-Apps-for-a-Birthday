import InputForm from "./components/InputForm";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-yellow-200 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-orange-600">
          Idea Roaster 3000
        </h1>
        <InputForm />
      </div>
    </main>
  );
}
