import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const imgStorageApi = "3f67787d6399449802b3d820607b790d";
const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${imgStorageApi}`;

const CreateAlbumModal = ({ openModal, setOpenModal, setUserAlbum }) => {
  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    unregister,
    setError,
    reset,
    formState: { errors },
  } = useForm();
  const [images, setImages] = useState(null);
  const [files, setFiles] = useState([]);
  const [filePreview, setFilePreview] = useState([]);
  const [videoInput, setVideoInput] = useState(1);
  const user = useSelector((state) => state.userReducer.user);

  const uploadImage = async (img) => {
    try {
      let formData = new FormData();
      formData.append("image", img);
      const { data } = await axios.post(imgUploadUrl, formData);
      let imageUrl = data.data.display_url;
      return imageUrl;
    } catch (error) {
      return null;
    }
  };
  const onSubmit = async (data) => {
    if (files.length > 0) {
      try {
        const uploadPromises = files.map(async (file) => {
          const result = await uploadImage(file);
          return result;
        });

        const images = await Promise.all(uploadPromises);
        setImages(images);

        const keysToExclude = ["albumName", "note"];
        const filteredVideos = Object.entries(data)
          .filter(([key, value]) => !keysToExclude.includes(key))
          .map(([key, value]) => value);

        axios
          .post("/api/user/classroom", {
            userId: user._id,
            albumName: data.albumName,
            images: images,
            videos: filteredVideos,
            notes: data.note,
          })
          .then((res) => {
            toast.success(res.data.message);
            setUserAlbum((prev) => [...prev, res.data.album]);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error("Error uploading images:", error);
      } finally {
        setFilePreview([]);
        setFiles([]);
        setVideoInput(1);
        reset();
        setOpenModal(false);
      }
    }
  };

  return (
    <>
      {openModal && (
        <div
          onClick={(e) => {
            setOpenModal(false);
          }}
          className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 transition-opacity duration-700 ease-in-out ${
            openModal ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}>
          <div
            onClick={(e) => e.stopPropagation()}
            className=" bg-[#F8F5FA] h-auto border-none rounded-[20px] py-[27px] px-[34px]">
            {/* {loading && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
                <div className="h-screen flex justify-center items-center">
                  <CirclesWithBar
                    height="80"
                    width="80"
                    color="#8FDDFD"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    outerCircleColor=""
                    innerCircleColor=""
                    barColor=""
                    ariaLabel="circles-with-bar-loading"
                  />
                </div>
              </div>
            )} */}
            <div className="relative w-[700px] bg-[#F8F5FA] ">
              <div className="">
                <p className="text-2xl font-bold text-black leading-none">
                  Create Album
                </p>

                <form
                  className="w-full bg-custom-white  rounded-t-0 mt-6"
                  onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label className=" text-sm text-black font-bold mb-2 leading-6">
                      Album name
                    </label>
                    <div className="relative w-full flex items-center bg-white rounded-[4px]">
                      <input
                        {...register("albumName", {
                          required: {
                            value: true,
                            message: "Please enter album name",
                          },
                        })}
                        className="w-full px-4 py-4 font-medium text-sm focus:outline-none placeholder:text-gray-400 placeholder:text-sm text-black bg-white"
                        type="text"
                        placeholder="Enter album name"
                      />
                    </div>
                    {errors.albumName && (
                      <p className="text-red-500">{errors.albumName.message}</p>
                    )}
                  </div>

                  <div className="flex flex-wrap space-x-2">
                    {" "}
                    {filePreview.length > 0 &&
                      filePreview.map((url, index) => {
                        return (
                          <div className="relative" key={index}>
                            <img
                              src={url.url}
                              alt=""
                              className="w-[200px] h-[200px] my-3"
                            />
                            <button
                              onClick={() => {
                                const restFile = filePreview.filter(
                                  (file) => file != url
                                );
                                setFilePreview([...restFile]);
                                const restfile = files.filter(
                                  (file) => file.name != url.file.name
                                );
                                setFiles([...restfile]);
                              }}
                              className="absolute top-0 left-[190px]">
                              X
                            </button>
                          </div>
                        );
                      })}
                  </div>

                  <div className="flex items-center mt-5">
                    <label className="flex justify-start w-full h-full transition appearance-none">
                      <div className="border-2 cursor-pointer rounded-[12px] px-6 py-3 hover:border-[#E8ECEF] border-[#E8ECEF] bg-[#F8F5FA] text-black hover:bg-[#F8F5FA]">
                        Upload image
                      </div>
                      <input
                        onChange={(e) => {
                          const file = e.target?.files?.[0];
                          if (file) {
                            const url = URL.createObjectURL(e.target.files[0]);
                            setFilePreview((prev) => [
                              ...prev,
                              { file: e.target.files[0], url },
                            ]);
                            setFiles((prev) => [...prev, file]);
                          }
                        }}
                        multiple
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="w-full mt-4">
                    <label className="mb-2 text-sm text-black font-bold leading-6 flex justify-between">
                      Video
                      <button
                        type="button"
                        onClick={() => setVideoInput(videoInput + 1)}>
                        Add More +
                      </button>
                    </label>
                    {[...Array(videoInput).keys()].map((_, index) => (
                      <div
                        key={index}
                        className="relative w-full my-3 flex items-center bg-white rounded-[4px]">
                        <input
                          {...register(`video${index}`, {
                            required: {
                              value: true,
                              message: "Please enter amount",
                            },
                          })}
                          className="w-full px-4 py-4 font-medium text-sm focus:outline-none placeholder:text-gray-400 placeholder:text-sm text-black bg-white"
                          type="text"
                          placeholder="Enter video url"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (videoInput != 1) {
                              setVideoInput(videoInput - 1);
                              //   resetField(`video${index}`);
                              unregister(`video${index}`);
                            }
                          }}
                          className="text-3xl m-2">
                          -
                        </button>
                      </div>
                    ))}
                    {errors.video && (
                      <p className="text-red-500">{errors.video.message}</p>
                    )}
                  </div>
                  <div className="w-full mt-4">
                    <label className="mb-2 text-sm text-black font-bold leading-6 ">
                      Enter Notes
                    </label>
                    <div className="relative w-full flex items-center bg-white rounded-[4px]">
                      <input
                        {...register("note", {
                          required: {
                            value: true,
                            message: "Please enter note",
                          },
                        })}
                        className="w-full px-4 py-4 font-medium text-sm focus:outline-none placeholder:text-gray-400 placeholder:text-sm text-black bg-white"
                        type="text"
                        placeholder="Enter note"
                      />
                    </div>
                    {errors.note && (
                      <p className="text-red-500">{errors.note.message}</p>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-10 gap-[6px]">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setOpenModal(false)}
                        className="bg-white rounded-lg py-3 px-6 cursor-pointer">
                        Cancel
                      </button>
                      <input
                        type="submit"
                        value="Save"
                        className="flex justify-center items-center rounded-lg w-full h-12 text-white font-bold  cursor-pointer bg-[#6B1AAB] py-3 px-6"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <button
                onClick={() => setOpenModal(false)}
                className="cursor-pointer absolute top-0 right-0">
                X
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAlbumModal;
