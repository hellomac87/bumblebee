import Wrapper from "../../components/layout/Wrapper";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
type Inputs = {
  title: string;
  message: string;
  image: string;
};

function UpLoadPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("message", data.message);
    formData.append("image", data.image[0]);

    axios.post("http://localhost:3003/api/posts", formData);
  };
  return (
    <Wrapper>
      <h1>UpLoadPage</h1>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <input {...register("title")} type="text" placeholder="Title" />
        <textarea {...register("message")} placeholder="Message" />
        <input {...register("image")} type={"file"} accept="image/*" />
        <button type="submit">Submit</button>
      </form>
    </Wrapper>
  );
}

export default UpLoadPage;
