"use client";
import Header from "../../comp/header";
import Footer from "../../comp/footer";
import { useState, useMemo, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";

import "react-quill/dist/quill.snow.css";

export default function Share({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("POST");
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const imageHandler = useCallback(async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      if (file) {
        try {
          // Upload image to Supabase

          const { data, error: uploadError } = await supabase.storage
            .from("posts")
            .upload(filePath, file);

          if (error) throw error;

          // Get public URL of the uploaded image
          const { publicURL, error: urlError } = supabase.storage
            .from("posts")
            .getPublicUrl(data.path);

          if (urlError) throw urlError;

          // Insert image URL into Quill editor
          const quill = this.quill;
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, "image", publicURL);
        } catch (error) {
          console.error("Error uploading image: ", error);
        }
      }
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  async function updateProfile({ content, category }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("posts").upsert({
        id: user?.id,
        content: content,
        category: category,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="cover-container flex flex-col items-center justify-center w-full h-full p-3 mx-auto">
      <Header user={user} />
      <main className="px-3 my-3 w-full">
        <h1 className="text-4xl font-bold mb-4">Share</h1>
        <ReactQuill
          modules={{
            toolbar: {
              container: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
              ],
              handlers: {
                image: imageHandler,
              },
            },
          }}
          value={value}
          onChange={setValue}
          placeholder="Enter the message..........."
        />
        <div className="w-full py-6 pb-8">
          <div className="relative inline-block">
            <button
              type="button"
              className="px-4 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center"
              onClick={toggleDropdown}
            >
              {category == "POST" &&
                "POST - for sharing general informative non-personal submission"}
              {category == "SHOW" && "SHOW - for sharing your personal work"}
              {category == "ASK" &&
                "ASK - lists questions and other question-like submissions"}
              {category == "JOURNAL" &&
                "JOURNAL - for your personal life updates"}
              <svg
                class="w-2.5 h-2.5 ml-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {isOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-88 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <ul
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setCategory("POST");
                        closeDropdown();
                      }}
                    >
                      POST - for sharing general informative non-personal
                      submission
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setCategory("SHOW");
                        closeDropdown();
                      }}
                    >
                      SHOW - for sharing your personal work
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setCategory("ASK");
                        closeDropdown();
                      }}
                    >
                      ASK - lists questions and other question-like submissions
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setCategory("JOURNAL");
                        closeDropdown();
                      }}
                    >
                      JOURNAL - for your personal life updates
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <button
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit"
          onClick={() => updateProfile({ content, category })}
        >
          Share
        </button>
      </main>
      <Footer />
    </div>
  );
}
