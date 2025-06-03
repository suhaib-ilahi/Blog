import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { service } from "../../appwrite/dbConfig";
import { useSelector } from "react-redux";
import {Select,RTE,Input,Button} from "..";

function PostForm({ post }) {  
  const {register, handleSubmit, watch, getValues, setValue, control} = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      slug: post?.slug || "",
      status: post?.status || "",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.userData);

  const submit = async (data) => {
    console.log("Submitting the data",data)
    if (post) {
      console.log(data)
      const file = data.imageUrl[0]
        ? await service.uploadFile(data.imageUrl[0])
        : null;
      if (file) {
        await service.deleteFile(post.imageUrl);
      }
      const dbPost = await service.updatePost(post?.$id, {
        ...data,
        imageUrl: file ? file.$id : null,
      });

      if (dbPost) {
        navigate(`post/${dbPost.$id}`);
      }
    } else {
      const file = data.imageUrl[0]
        ? service.uploadFile(data.imageUrl[0])
        : null;
        data.imageUrl = file
      const dbPost = await service.createPost({
        ...data,
        userId : userData.$id
      });
      if (dbPost) {
        navigate(`post/${dbPost.$id}`);
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (!!value && typeof value === "string") {
      return value.trim().toLowerCase().replace(/\s/g, "-");
    }

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title")
        setValue(slugTransform(value.title, { shouldValidate: true }));
    });

    return subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);


  return (
      <div>
       <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("imageUrl", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post?.featuredImage)}
                            alt={post?.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <br />
                <Button onClick={handleSubmit(submit)} bgColor="bg-green-500" className="w-full cursor-pointer">
                   Submit
                </Button>
            </div>
        </form>
      </div>
  )
}

export default PostForm;
