import { useForm } from "react-hook-form";
import { isLoggedInVar } from "../apollo";

// typescript와 react hook form 연결.
interface IForm {
  email: string;
  password: string;
}

export const LoggedOutRouter = () => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<IForm>();

  const onSubmit = () => {
    console.log(watch());
  };
  const onValid = () => {
    console.log("Can't create Account");
  };

  return (
    <div>
      <h1>Logged Out</h1>
      <form onSubmit={handleSubmit(onSubmit, onValid)}>
        <input
          {...register("email", {
            required: "This is required",
            pattern: /^[A-Za-z0-9._%+-]+@gmail.com$/,
          })}
        />
        {errors.email?.message && (
          <span className="font-bold text-red-600">{errors.email.message}</span>
        )}
        {errors.email?.type && (
          <span className="font-bold text-red-600">Only Gmail allowed</span>
        )}
        <input {...register("password")} />
        <button className="bg-yellow-300 text-white">SUBMIT</button>
      </form>
      <button onClick={() => isLoggedInVar(true)}>Click to Login</button>
    </div>
  );
};
