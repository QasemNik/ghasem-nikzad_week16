import Input from "./Input";
import cities from "./cities";

function App() {
   return (
      <div className="p-4 text-2xl">
         <Input hint="Insert your city name:" cities={cities} />
      </div>
   );
}

export default App;
