import React, { useEffect, useRef, useState } from "react";
import Userimg from "../../../../assets/img/team-2.jpg";
import Userimg1 from "../../../../assets/img/small-logos/logo-spotify.svg";
import { Navigate, useNavigate } from "react-router-dom";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import TopNav from "../../../../shared/TopNav";
import { CKEditor } from "ckeditor4-react";
import { toast } from "react-toastify";
import { text } from "stream/consumers";
import VendorAPI from "../../../../api/services/vendorLogin/vendorApi";
import API from "../../../../api/api";
import API_EP_BOOK from "../../../../api/endpoints";
import { FadeLoader } from "react-spinners";
import Footer from "../../../../shared/Footer";
import Loading from "../../../../components/Common/Loading";
import "./flow.css";

interface LangCodeDrop {
  id: string;
  language_name: string;
  language_code: string;
}
function WhatsappFlowCreate() {
  type FormValue = {
    name: string;
    value: string;
  };
  const [redirect, setRedirect] = React.useState<string | null>(null);
  const [langCodeDrop, setlangCodeDrop] = useState<LangCodeDrop[]>([]);
  const navigate = useNavigate();
  const [headerType, setHeaderType] = useState("None");
  const [BodyType, setBodyType] = useState("None");
  const [footerType, setFooterType] = useState("None");
  const [file, setFile] = useState<File | null>(null);
  const [imgValue, setImgValue] = useState("");
  const [imgid, setImgid] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [setValue, setSetValue] = useState("");

  useEffect(() => {
    const queryParams = window.location.pathname;
    const myArray = queryParams.split("/");
    setSetValue(myArray[2]);
  });

  const [selectedValue, setSelectedValue] = useState("None");
  const [bodyselectedValue, setBodySelectedValue] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [textInput, setTextInput] = useState("");
  const [BodytextInput, setBodyTextInput] = useState<string>("");
  const [bodychildtextInput, setbodychildTextInput] = useState([]);
  const [footertextInput, setFooterTextInput] = useState("");
  const [isAddDisabled, setIsAddDisabled] = useState(false);
  const [showIndex, setShowIndex] = useState(0);
  const [showIndex1, setShowIndex1] = useState(0);
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const [editorInstance1, setEditorInstance1] = useState<any>(null);
  const [editorInstanceCaros, setEditorInstanceCaros] = useState<any>(null);
  const [BodytextInput1, setBodyTextInput1] = useState<string>("");
  const [bodyformValues1, setBodyFormValues1] = useState<
    { name: string; value: string }[]
  >([]);
 const [currentIndex, setCurrentIndex] = useState(0);
  const [slides,setslides] = useState<any>([]);
  console.log(slides,"SlidesCarousel")
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };
  // Templatate Create Usestates
  const editorInstanceRef1 = useRef<any>(null);
  useEffect(() => {
    if (editorInstanceRef1.current && BodytextInput1 !== undefined) {
      editorInstanceRef1.current.setData(BodytextInput1);
    }
  }, [BodytextInput1]);
 
  const [names, setNames] = useState("");
  const [whatsappId, setWhatsappId] = useState("");
  const [category, setCategory] = useState("");
  const [languageCode, setLaguageCode] = useState("");
  const [langName, setLangName] = useState("");
  const [getId, setGetId] = useState("");
  const [bodyTextValues, setBodyTextValues] = useState("");
  const [textValues, setTextValues] = useState("");



// new states
  const [keyWord, setKeyWord] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [otherKeywords, setOtherKeywords] = useState("");
  const [hederText, setHederText] = useState("");
  const [isFocusedHeder, setIsFocusedHeder] = useState(false);
  const [bodyText, setBodytext] = useState("");
  const [isFocusedBody, setIsFocusedBody] = useState(false);
  const [flowText, setFlowText] = useState("");
  const [isFocusedFlow, setIsFocusedFlow] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const [flowRedio, setFlowRadio] = useState("");
  const [addButton, setAddButton] = useState("");










  
  useEffect(() => {
    const queryParams = window.location.pathname;
    const myArray = queryParams.split("/");
    setGetId(myArray[3]);
  }, []);
  useEffect(() => {
    if (getId && getId !== "undefined" && getId !== "") {
      whatsappGetApi(getId);
    }
  }, [getId]);

const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
const [open1, setOpen1] = useState(false);
  const dropdownRef1 = useRef<HTMLDivElement>(null);


  const items = [
    "Sign up",
    "Sign in",
    "Appointment booking",
    "Lead generation",
    "Shopping",
    "Contact us",
    "Contact support",
    "Survey",
    "Other",
  ];

  // Toggle dropdown
  const toggleDropdown = () => setOpen(!open);
  const toggleDropdown1 = () => setOpen(!open);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e:any) {
      if (dropdownRef1.current && !dropdownRef1.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  useEffect(() => {
  function handleOutside(e: MouseEvent) {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }
  document.addEventListener("click", handleOutside);
  return () => document.removeEventListener("click", handleOutside);
}, []);


  

  const [buttonPhoneOpt, setButtonPhoneopt] = useState(false);
  const [buttoncopyOpt, setButtoncopyopt] = useState(false);
  const [buttonurlOpt, setButtonurlopt] = useState(false);
  const [buttondynamicurlOpt, setButtondynamicurlopt] = useState(false);
  const [quickbtn, setquickbtn] = useState("None");
  const [phoenobtn, setphoenobtn] = useState("None");
  const [copybtn, setcopybtn] = useState("None");
  const [urlbtn, seturlbtn] = useState("None");
  const [dynamicurlbtn, setdynamicurlbtn] = useState("None");
  const [buttonActive, setbuttonActive] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  
  const [urlButtons, setUrlButtons] = useState<any>([]);
  const [dynamicurlButtons, setdynamicUrlButtons] = useState<any>([]);
  const [quickreplyButtons, setquickreplyButtons] = useState<any>([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [quickreplyDisabled, setquickreplyDisabled] = useState(false);

  useEffect(() => {
    setEditorReady(true);
  }, []);
  // 👇 Add this inside your component
// useEffect(() => {
//   const total =
//     quickreplyButtons.length +
//     urlButtons.length +
//     dynamicurlButtons.length +
//     (buttonPhoneOpt ? 1 : 0) +
//     (buttoncopyOpt ? 1 : 0);

//   setquickreplyDisabled(total >= 10);
// }, [
//   quickreplyButtons.length,
//   urlButtons.length,
//   dynamicurlButtons.length,
//   buttonPhoneOpt,
//   buttoncopyOpt,
// ]);
const [buttonOrder, setButtonOrder] = useState<any[]>([]);

// Update disabled state whenever buttonOrder changes
useEffect(() => {
  const quickreplyButtons = buttonOrder.filter((b) => b.type === "QUICK_REPLY");
  const urlButtons = buttonOrder.filter((b) => b.type === "URL");
  const dynamicurlButtons = buttonOrder.filter((b) => b.type === "DYNAMIC_URL");
  const phoneButtons = buttonOrder.filter((b) => b.type === "PHONE_NUMBER");
  const copyButtons = buttonOrder.filter((b) => b.type === "COPY_CODE");

  const total =
    quickreplyButtons.length +
    urlButtons.length +
    dynamicurlButtons.length +
    phoneButtons.length +
    copyButtons.length;

  // Quick Reply button disabled if total >= 10
  setquickreplyDisabled(total >= 10);

  // URL/Dynamic URL disabled if 2 URL-type buttons exist or total >= 10
  setButtonDisabled(urlButtons.length + dynamicurlButtons.length >= 2 || total >= 10);

  // Optional: disable Phone Number if already exists
  setButtonPhoneopt(phoneButtons.length > 0 || total >= 10);

  // Optional: disable Copy Code if already exists
  setButtoncopyopt(copyButtons.length > 0 || total >= 10  );
}, [buttonOrder]);


  // 🧮 Compute totals dynamically
const totalUrlButtons = urlButtons.length + dynamicurlButtons.length;
const totalQuickButtons = quickreplyButtons.length;
const totalButtons =
  totalUrlButtons + totalQuickButtons +
  (buttonPhoneOpt ? 1 : 0) +
  (buttoncopyOpt ? 1 : 0);

// ✅ Helper function to check total before adding
const canAddMoreButtons = () => totalButtons < 10;

const handleQuickButtonOpt = () => {
  if (buttonOrder.length >= 10) return;

  const newBtn = { text: "" };
  setButtonOrder((prev) => [...prev, { type: "QUICK_REPLY", data: newBtn }]);
  setbuttonActive(true);
  setquickbtn("QUICK_REPLY");
};

const handleUrlButtonOpt = () => {
  const totalUrls = buttonOrder.filter((b) => b.type === "URL" || b.type === "DYNAMIC_URL").length;
  if (buttonOrder.length >= 10 || totalUrls >= 2) return;

  const newBtn = { text: "", url: "" };
  setButtonOrder((prev) => [...prev, { type: "URL", data: newBtn }]);
  setbuttonActive(true);
  seturlbtn("URL");
};

const handleDynamicurlButtonOpt = () => {
  const totalUrls = buttonOrder.filter((b) => b.type === "URL" || b.type === "DYNAMIC_URL").length;
  if (buttonOrder.length >= 10 || totalUrls >= 2) return;

  const newBtn = { text: "", url: "", example: [""] };
  setButtonOrder((prev) => [...prev, { type: "DYNAMIC_URL", data: newBtn }]);
  setbuttonActive(true);
  setdynamicurlbtn("URL");
};

const handlePhoneButtonOpt = () => {
  if (buttonOrder.some((b) => b.type === "PHONE_NUMBER")) return;
  setButtonOrder((prev) => [...prev, { type: "PHONE_NUMBER", data: { text: "", phone_number: "91" } }]);
  setbuttonActive(true);
  setphoenobtn("PHONE_NUMBER");
};

const handleCopycodeButtonOpt = () => {
  if (buttonOrder.some((b) => b.type === "COPY_CODE")) return;
  setButtonOrder((prev) => [...prev, { type: "COPY_CODE", data: { example: [""] } }]);
  setbuttonActive(true);
  setcopybtn("COPY_CODE");
};
const handleButtonChangeNew = (index: number, field: string, value: any) => {
  setButtonOrder((prev) => {
    const updated = [...prev];
    const button = { ...updated[index] };

    if (field === "example") {
      button.data.example = [value];
    } else {
      button.data[field] = value;
    }

    updated[index] = button;
    return updated;
  });
};
const removeButtonNew = (index: number) => {
  setButtonOrder((prev) => prev.filter((_, i) => i !== index));
};

  // const handleDynamicurlButtonOpt = () => {
  //   setButtondynamicurlopt(true);
  //   setbuttonActive(true);
  //   setdynamicurlbtn("URL");
  // };

  const [carouselsubmit, setcarouselSubmit] = useState(false);
  const [carouselMediaIds, setcarouselMediaIds] = useState<any[]>([]);

  interface HeaderComponent {
    type: "header";
    format: string;
    example: { header_handle: string[] };
  }

  interface BodyComponent {
    type: "body";
    text: string;
    variables: { name: string; value: string }[];
    example: { body_text: string[] };
  }
  interface ButtonComponent {
    type: "buttons";
    buttons: {
      type:
        | "quick_reply"
        | "phone_number"
        | "copy_code"
        | "url";
      text: string;
      phone_number?: string;
      example?: string[];
      url?: string;
    }[];
  }
  interface CarouselItem {
    components: (HeaderComponent | BodyComponent | ButtonComponent)[];
    id: number;
    fileName: string;
  }

  const createNewCarousel = (): CarouselItem => ({
    components: [
      {
        type: "header",
        format: "",
        example: { header_handle: [] },
      },
      {
        type: "body",
        text: "",
        variables: [],
        example: { body_text: [] },
      },
      {
        type: "buttons",
        buttons: [],
      },
    ],
    id: Date.now(),
    fileName: "",
  });
  const [loadings, setLoadings] = useState<{ [key: string]: boolean }>({}); // loading per item
  const handleFileChange1 = async (
    id: any,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    setLoadings((prev) => ({ ...prev, [id]: true }));
    const previewUrl = URL.createObjectURL(selectedFile);
    const fileType = selectedFile.type.startsWith('video') ? 'video' : 'image';
    const indexToUpdate = carousels.findIndex((item) => item.id === id);
    setslides((prevSlides:any) => {
    const newSlides = [...prevSlides];
    const newSlide = {id,
        src: previewUrl,
        type: fileType,
    };

    if (indexToUpdate >= 0) {
      const newSlides = [...prevSlides];
      newSlides[indexToUpdate] = {
        ...newSlides[indexToUpdate],
        ...newSlide,
      };
      return newSlides;
    } else {
      return [...prevSlides, newSlide];
    }
    });

    console.log('Preview URL:', previewUrl);
    setCarousels((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, fileName: selectedFile.name } : item
      )
    );
    try {
    const uploadResult = await handleImgUpload(selectedFile);
    if (!uploadResult) return;

    setcarouselMediaIds((prev) => {
        const newMediaIds = [...prev];
        if (indexToUpdate >= 0) {
        newMediaIds[indexToUpdate] = uploadResult.id;
        }
        return newMediaIds;
    });

    setCarousels((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              components: item.components.map((component) =>
                component.type === "header"
                  ? {
                      ...component,
                      example: {
                        ...component.example,
                        header_handle: [uploadResult.h],
                      },
                    }
                  : component
              ),
            }
          : item
      )
    );
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoadings((prev) => ({ ...prev, [id]: false }));
    }
  };


  const [carousels, setCarousels] = useState<CarouselItem[]>([
    createNewCarousel(),
  ]);
  console.log(carousels,"Carousel")
//   function logSanitizedCarousels(carousels: CarouselItem[]) {
//   const sanitized = carousels.map(({ components }) => ({
//     components: components.map((component) => {
//       switch (component.type) {
//         case "body":
//           return {
//             type: "body",
//             text: component.text,
//             example: component.example,
//           };
//         case "header":
//           return {
//             type: "header",
//             format: component.format,
//             example: component.example,
//           };
//         case "buttons":
//           return component; // sanitize more if needed
//         default:
//           return component;
//       }
//     }),
//   }));

//   console.log("Sanitized Carousels:", sanitized);
//   console.log("Sanitized carouselMediaIds:", carouselMediaIds);
// }
// logSanitizedCarousels(carousels);

  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});
  function handleHeaderChange(id: number, format: string) {
    setCarousels((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            components: item.components.map((c) =>
              c.type === "header" ? { ...c, format } : c
            ),
          };
        }
        return item;
      })
    );
  }

  // Handle CKEditor body text change
  const editorCarosRefs = useRef<{ [id: number]: any }>({});
  function handleEditorChangeNew(id: number, newText: string) {
  const convertToWhatsAppFormat = (html: string): string => {
    return html
      .replace(/&nbsp;/g, " ")
      .replace(/<br\s*\/?>/gi, "")
      .replace(/<strong>(.*?)<\/strong>/gi, "*$1*")
      .replace(/<b>(.*?)<\/b>/gi, "*$1*")
      .replace(/<em>(.*?)<\/em>/gi, "_$1_")
      .replace(/<i>(.*?)<\/i>/gi, "_$1_")
      .replace(/<strike>(.*?)<\/strike>/gi, "~$1~")
      .replace(/<s>(.*?)<\/s>/gi, "~$1~")
      .replace(/<(?!\/?(b|i|s)\b)[^>]+>/gi, "");
  };

  const formattedText = convertToWhatsAppFormat(newText);

  setCarousels((prev) =>
    prev.map((item) => {
      if (item.id !== id) return item;

      return {
        ...item,
        components: item.components.map((c) => {
          if (c.type === "body") {
            const matches = formattedText.match(/{{\d+}}/g) || [];
            const uniquePlaceholders = Array.from(new Set(matches));

            const existingVars = c.variables || [];
            const existingValues = existingVars.map((v) => v.value);

            const newVars = uniquePlaceholders
              .filter((p) => !existingValues.includes(p))
              .map((p) => ({ name: "", value: p }));

            const filteredVariables = [
              ...existingVars.filter((v) =>
                uniquePlaceholders.includes(v.value)
              ),
              ...newVars,
            ];

            const cleanedText = formattedText.replace(/{{[^}]*}?}?/g, (match) => {
              return /{{\d+}}/.test(match) ? match : "";
            });
            setslides((prevSlides: any[]) => {
              const indexToUpdate = prevSlides.findIndex((slide) => slide.id === id);
              if (indexToUpdate >= 0) {
                const newSlides = [...prevSlides];
                newSlides[indexToUpdate] = {
                  ...newSlides[indexToUpdate],
                  bodyText: cleanedText,
                };
                return newSlides;
              } else {
                return [...prevSlides, { id, bodyText: cleanedText }];
              }
            });

            return {
              ...c,
              text: cleanedText,
              variables: filteredVariables,
            };
          }
          return c;
        }),
      };
    })
  );
}


  function handleAddVariable(id: number) {
    const editor = editorCarosRefs.current[id];

    if (!editor) return;
    setCarousels((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const bodyComponent = item.components.find(
          (c): c is BodyComponent => c.type === "body"
        );
        if (!bodyComponent) return item;
        const currentVars = bodyComponent.variables || [];
        const nextIndex = currentVars.length + 1;
        const newPlaceholder = `{{${nextIndex}}}`;
        const newVariable = {
          name: "",
          value: newPlaceholder,
        };
        const newText = bodyComponent.text + newPlaceholder; 
        editor.focus(); 
        editor.insertText(newPlaceholder); 
        const updatedText = editor.getData();
        return {
          ...item,
          components: item.components.map((c) =>
            c.type === "body"
              ? {
                  ...c,
                  text: updatedText,
                  variables: [...currentVars, newVariable],
                }
              : c
          ),
        };
      })
    );
  }

  // Handle variable name change
  function handleVariableNameChange(id: number, index: number, name: string) {
    setCarousels((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const body = item.components.find(
            (c) => c.type === "body"
          ) as BodyComponent;
          const newVariables = [...(body.variables || [])];
          newVariables[index] = { ...newVariables[index], name };
          return {
            ...item,
            components: item.components.map((c) =>
              c.type === "body"
                ? {
                    ...c,
                    variables: newVariables,
                    example: { body_text: newVariables.map((v) => v.name) },
                  }
                : c
            ),
          };
        }
        return item;
      })
    );
  }

  // Handle removing a variable
  function handleRemoveVariable(id: number, indexToRemove: number) {
    setCarousels((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const body = item.components.find(
            (c) => c.type === "body"
          ) as BodyComponent;
          let newVariables = (body.variables || []).filter(
            (_, i) => i !== indexToRemove
          );
          newVariables = newVariables.map((v, i) => ({
            name: v.name,
            value: `{{${i + 1}}}`,
          }));
          return {
            ...item,
            components: item.components.map((c) =>
              c.type === "body"
                ? {
                    ...c,
                    variables: newVariables,
                    example: { body_text: newVariables.map((v) => v.name) },
                  }
                : c
            ),
          };
        }
        return item;
      })
    );
  }
  let skipReset = false;

const addCarousel = () => {
  let isValid = true;

  for (const item of carousels) {
    const headerComponent = item.components.find(c => c.type === "header");
    const bodyComponent = item.components.find(c => c.type === "body");
    const buttonComponent = item.components.find(c => c.type === "buttons");
    if (!headerComponent || headerComponent.type !== "header" || !("format" in headerComponent) || !headerComponent.format) {
      isValid = false;
    }
    if (!item.fileName) {
      isValid = false;
    }
    if (
      !bodyComponent ||
      bodyComponent.type !== "body" ||
      !("text" in bodyComponent) ||
      !bodyComponent.text ||
      bodyComponent.text.replace(/<[^>]*>/g, "").trim() === ""
    ) {
      isValid = false;
    }

    if (
      !buttonComponent ||
      buttonComponent.type !== "buttons" ||
      !("buttons" in buttonComponent) ||
      buttonComponent.buttons.length === 0
    ) {
      isValid = false;
    } else {
      for (const btn of buttonComponent.buttons) {
        if (!btn.text || !btn.text.trim()) {
          isValid = false;
        }

        if (btn.type === "phone_number") {
          if (!btn.phone_number || !/^\d{10,12}$/.test(btn.phone_number.trim())) {
            isValid = false;
          }
        }

        if (btn.type === "url") {
          if (!btn.url || btn.url.trim() === "") {
            isValid = false;
          }
          if (!btn.example?.[0] || btn.example[0].trim() === "") {
            isValid = false;
          }
        }
      }
    }
  }

  setcarouselSubmit(true);
  if (isValid) {
    console.log("All carousels are valid!");
    document.getElementById("closeModal1")?.click();
    setcarouselSubmit(false);
  } else {
    console.warn("Some inputs are missing or invalid!");
  }
    };

  // Add new carousel
  function handleAddCarousel(afterId?: number) {
    setCarousels((prev) => {
        if (prev.length >= 10) {
      return prev; // Do not add more
    }
      const newItem = createNewCarousel();
      if (afterId === undefined) return [...prev, newItem];
      const idx = prev.findIndex((item) => item.id === afterId);
      if (idx === -1) return [...prev, newItem];
      return [...prev.slice(0, idx + 1), newItem, ...prev.slice(idx + 1)];
    });
  }

  // Remove carousel
function handleRemoveCarousel(id: number) {
  setCarousels((prevCarousels) => {
    if (prevCarousels.length <= 1) return prevCarousels;

    const indexToRemove = prevCarousels.findIndex((item) => item.id === id);
    if (indexToRemove === -1) return prevCarousels;

    // Update slides
    setslides((prevSlides: any[]) => {
      const newSlides = [...prevSlides];
      newSlides.splice(indexToRemove, 1); 
      return newSlides;
    });

    // Update mediaIds
    setcarouselMediaIds((prevMediaIds: any[]) => {
      const newMediaIds = [...prevMediaIds];
      newMediaIds.splice(indexToRemove, 1);
      return newMediaIds;
    });

    // Finally update carousels
    const newCarousels = [...prevCarousels];
    newCarousels.splice(indexToRemove, 1);
    return newCarousels;
  });
}


  // Buttons
  type ButtonType =
    | "quick_reply"
    | "phone_number"
    | "copy_code"
    | "url";
  function handleAddButton(id: number, type: ButtonType) {
    const newButton = getDefaultButtonByType(type);
          if (!newButton) return;

    setCarousels((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const updatedComponents = item.components.map((component) => {
          if (component.type !== "buttons") return component;

          const existing = component.buttons.some((btn) => btn.type === type);
          if (existing) return component;

          
          return {
            ...component,
            buttons: [...component.buttons, newButton],
          };
        });

        return { ...item, components: updatedComponents };
      })
    );
  //   setslides((prevSlides: any[]) => {
  //   const indexToUpdate = prevSlides.findIndex((slide) => slide.id === id);
  //   const existingButtons = indexToUpdate >= 0 ? prevSlides[indexToUpdate].buttons || [] : [];
  //   const updatedButtons = [...existingButtons, newButton];

  //   const newSlide = {
  //     id,
  //     buttons: updatedButtons,
  //   };

  //   if (indexToUpdate >= 0) {
  //     const newSlides = [...prevSlides];
  //     newSlides[indexToUpdate] = {
  //       ...newSlides[indexToUpdate],
  //       ...newSlide,
  //     };
  //     return newSlides;
  //   } else {
  //     return [...prevSlides, newSlide];
  //   }
  // });
  setslides((prevSlides: any[]) => {
  const indexToUpdate = prevSlides.findIndex((slide) => slide.id === id);
  const existingButtons = indexToUpdate >= 0 ? prevSlides[indexToUpdate].buttons || [] : [];
 
  // Prevent adding same button twice
  const alreadyExists = existingButtons.some((btn: any) => btn.type === type);
  if (alreadyExists) return prevSlides;
 
  const updatedButtons = [...existingButtons, newButton];
 
  const newSlide = {
    id,
    buttons: updatedButtons,
  };
 
  if (indexToUpdate >= 0) {
    const newSlides = [...prevSlides];
    newSlides[indexToUpdate] = {
      ...prevSlides[indexToUpdate],
      ...newSlide,
    };
    return newSlides;
  } else {
    return [...prevSlides, newSlide];
  }
});
  }
  function getDefaultButtonByType(
    type: ButtonType
  ): ButtonComponent["buttons"][number] {
    switch (type) {
      case "quick_reply":
        return { type: "quick_reply", text: "" };
      case "phone_number":
        return { type: "phone_number", text: "", phone_number: "" };
      case "copy_code":
        return { type: "copy_code", text: "", example: [""] };
      case "url":
        return { type: "url", text: "", url: "", example: [""] };
    }
  }
  function handleButtonChange(
    id: number,
    index: number,
    key: "text" | "phone_number" | "url" | "example",
    value: string
  ) {
    setCarousels((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const buttonComponent = item.components.find(
            (c) => c.type === "buttons"
          ) as ButtonComponent;
          const updatedButtons = [...buttonComponent.buttons];

          if (key === "example") {
            updatedButtons[index].example = [value];
          } else {
            (updatedButtons[index] as any)[key] = value;
          }

          return {
            ...item,
            components: item.components.map((c) =>
              c.type === "buttons"
                ? {
                    ...c,
                    buttons: updatedButtons,
                  }
                : c
            ),
          };
        }
        return item;
      })
    );
  }

function handleRemoveButton(
  id: number,
  type: ButtonComponent["buttons"][number]["type"]
) {
  // 1. Update carousels
  setCarousels((prev) =>
    prev.map((item) => {
      if (item.id !== id) return item;

      return {
        ...item,
        components: item.components.map((component) => {
          if (component.type !== "buttons") return component;

          // ✅ Remove all buttons of the given type
          const updatedButtons = component.buttons.filter(
            (btn) => btn.type !== type
          );

          return {
            ...component,
            buttons: updatedButtons,
          };
        }),
      };
    })
  );

  // 2. Update slides
  setslides((prevSlides: any[]) =>
    prevSlides.map((slide) => {
      if (slide.id !== id) return slide;

      const updatedButtons = (slide.buttons || []).filter(
        (btn: any) => btn.type !== type
      );

      return {
        ...slide,
        buttons: updatedButtons,
      };
    })
  );
}


  // Reset single carousel  to initial state
  
  function resetCarousels() {
    setCarousels([createNewCarousel()]);
    setcarouselSubmit(false);
    setslides([]);
  }

  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);

  const handleCategorySelect = (categoryValue: any) => {
    setCategory(categoryValue);
  };

  // Handle dropdown selection
  const handleDropdownClick = (type: string) => {
    setSelectedValue(type);
    setHeaderType(type);
    setBodyType(type);
    setFooterType(type);

    if (type === "text") {
      setTextInput("");
    }
    if (type === "None") {
      setTextInput("");
      setHeaderTextInput("");
      setFormValue(null);
      setIsAddDisabled(false);
    }
  };
  useEffect(() => {
    setBodyTextInput(BodytextInput);
  }, [BodytextInput, BodyType]);

  const handleBoxClick = () => {
    const fileInput = document.getElementById(
      "file-input"
    ) as HTMLInputElement | null;
    if (fileInput) {
      let acceptedTypes = "";
      switch (selectedValue) {
        case "image":
          acceptedTypes = "image/*";
          break;
        case "video":
          acceptedTypes = "video/*";
          break;
        case "document":
          acceptedTypes = ".pdf, .doc, .docx, .txt";
          break;
        default:
          acceptedTypes = "*/*";
      }

      fileInput.accept = acceptedTypes;
      setFileName("");
      fileInput.click();
    }
  };

  const handleTextInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTextInput(event.target.value);
  };

  const [formValue, setFormValue] = useState<FormValue | null>(null);
  const [headerTextInput, setHeaderTextInput] = useState<string>("");
  const [bodyformValues, setBodyFormValues] = useState<
    { name: string; value: string }[]
  >([]);
  console.log(bodyformValues, "Carousel Variables bodyformValues");
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formValue) {
      // Check if formValue is not null
      setFormValue({
        ...formValue, // Spread the current formValue
        name: e.target.value, // Update the name field
      });
    }
  };

  const handleHeaderTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedHeaderText = e.target.value;
    if (updatedHeaderText === "") {
      setFormValue(null);
      setIsAddDisabled(false);
    }
    setHeaderTextInput(updatedHeaderText);
    setTextInput(updatedHeaderText);
  };
  const add = (e: React.FormEvent) => {
    e.preventDefault();
    setFormValue({ name: "", value: "1" });
    if (!formValue?.value) {
      setHeaderTextInput((prev) => prev + `{{${formValue?.value || 1}}}`);
      setTextInput((prev) => prev + `{{${formValue?.value || 1}}}`);
    }
    setIsAddDisabled(true);
  };

  const bodyadd = (e: React.FormEvent) => {
    e.preventDefault();
    setBodyFormValues((prevFormValues) => {
      const newIndex = prevFormValues.length + 1;
      const newVariable = `{{${newIndex}}}`;

      if (prevFormValues.some((item) => item.value === newVariable)) {
        return prevFormValues;
      }

      if (editorInstance) {
        const editorContent = editorInstance.getData();

        if (!editorContent.includes(newVariable)) {
          editorInstance.insertHtml(`<span>${newVariable}</span>`);
        }
      }
      return [...prevFormValues, { name: "", value: newVariable }];
    });

    setShowIndex((prevIndex) => prevIndex + 1);
  };

  const handleBodyChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const userTypedText = e.target.value;
    const fixedPart = `{{${index + 1}}}`;
    setBodyFormValues((prevFormValues) =>
      prevFormValues.map((item, i) =>
        i === index
          ? { ...item, value: `${fixedPart}`, name: userTypedText }
          : item
      )
    );
  };

  const handleFooterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFooterTextInput(e.target.value);
  };
  const editorInstanceRef = useRef<any>(null);
  useEffect(() => {
    if (editorInstanceRef.current && BodytextInput !== undefined) {
      editorInstanceRef.current.setData(BodytextInput);
    }
  }, [BodytextInput]);
  const handleEditorChange = (event: any) => {
    if (!event.editor) return;
    const editorData = event.editor.getData();
    setBodyTextInput(editorData);
    if (event?.editor) {
      let htmlText = event.editor
        .getData()
        .replace(/&nbsp;/g, " ")
        .replace(/<br\s*\/?>/g, "");
      let formattedText = htmlText
        .replace(/<strong>(.*?)<\/strong>/g, "*$1*")
        .replace(/<em>(.*?)<\/em>/g, "_$1_")
        .replace(/<strike>(.*?)<\/strike>/g, "~$1~")
        .replace(/<s>(.*?)<\/s>/g, "~$1~");
      let cleanText = formattedText.replace(/<(?!\/?(b|i|s)\b)[^>]+>/g, "");
      setBodyTextInput(cleanText);

      const variablePattern = /{{\d+}}/g;
      const foundVariables = cleanText.match(variablePattern) || [];

      setBodyFormValues((prevFormValues) => {
        let updatedFormValues = foundVariables.map((variable: any) => {
          let existingItem = prevFormValues.find((item) =>
            item.value.startsWith(variable)
          );

          return existingItem ? existingItem : { value: `${variable} ` };
        });

        return updatedFormValues;
      });
    }
  };

  // Whatsapp Create Template Api
  const vendorWhatsappTemplateCreate = (e: any) => {
    e.preventDefault();
    setSubmit(true);
    if (!names && !langName && !category) {
      return;
    }
    //   setLoading(true)
    setIsLoading(true);
const payloadButtons = (() => {
  const quickReplies: any[] = [];
  const otherButtons: any[] = [];

  buttonOrder.forEach((b) => {
    const { type, data } = b;
    switch (type) {
      case "QUICK_REPLY":
        quickReplies.push({ type, text: data.text });
        break;
      case "PHONE_NUMBER":
        otherButtons.push({ type, text: data.text, phone_number: data.phone_number });
        break;
      case "COPY_CODE":
        otherButtons.push({ type, example: data.example?.[0] || "" });
        break;
      case "DYNAMIC_URL":
        otherButtons.push({ type: "URL", text: data.text, url: data.url.replace(/\/$/, "") + "/{{1}}", example: data.example });
        break;
      case "URL":
        otherButtons.push({ type, text: data.text, url: data.url });
        break;
      default:
        return null;
    }
  });

  // Combine and filter out falsy/null items
  return [...quickReplies, ...otherButtons].filter(Boolean);
})();

    let apiData = {
      ...(setValue === "edit-whatsapp-template" && { template_id: whatsappId }),
      name: names.toLowerCase(),
      category: category,
      ...(imgid && { mediaId: imgid }),
      language: languageCode,
      ...(selectedValue === "carousel" ? { carouselMediaIds } : null),
      components: [
        // HEADER component
        headerType === "text"
          ? {
              ...(headerType && textInput
                ? {
                    type: "HEADER",
                    format: headerType.toUpperCase(),
                    text: textInput,
                    ...(formValue?.name?.trim() && {
                      example: {
                        header_text: [formValue?.name.trim()],
                      },
                    }),
                  }
                : null),
            }
          : headerType === "image" ||
            headerType === "video" ||
            headerType === "document"
          ? {
              type: "HEADER",
              format: headerType,
              example: {
                header_handle: [imgValue],
              },
            }
          : null,
        // BODY component
        {
          type: "BODY",
          text: BodytextInput,
          ...(bodyformValues.length > 0 && {
            example: {
              body_text: [bodyformValues.map((param) => param.name.trim())],
            },
          }),
        },

        // FOOTER component
        footertextInput
          ? {
              type: "FOOTER",
              text: footertextInput,
            }
          : null,
        // BUTTON component
        buttonActive
          ? {
              type: "BUTTONS",
              buttons: payloadButtons,
            }
          : null,
          selectedValue==="carousel"?
          {
            type:"carousel",
            cards:carousels.map(({ components }) => ({
            components: components.map((component) => {
            switch (component.type) {
              case "body":
                return {
                  type: "body",
                  text: component.text,
                 ...(component.variables && component.variables.length > 0
    ? {
        example: {
          body_text: [component.variables.map((v) => v.name)],
        },
      }
    : null)
                };
              case "header":
                return {
                  type: "header",
                  format: component.format,
                  example: component.example,
                };
              case "buttons":
                return {
                  type: "buttons",
                  buttons: component.buttons,
                };
              default:
                return component;
            }
          }),
        })),
          }:null
      ].filter(
        (component) => component !== null && Object.keys(component).length > 0
      ),
    };
    VendorAPI.whatsappTemplateCreate(apiData)
      .then((responseData: any) => {
        if (responseData.apiStatus.code === "200") {
          toast.success(responseData.apiStatus.message);
          setIsLoading(false);
          setSubmit(false);
          navigate("/vendor/whatsapp-template");
        } else {
          setIsLoading(false);
          // setSubmit(false);
          toast.error(
            responseData.responseData?.error?.message ||
              responseData?.apiStatus?.message
          );
        }
      })
      .catch((error: any) => {
        console.error("Error during API call:", error);
      });
  };

  //   Get By Id
  const whatsappGetApi = async (id: any) => {
    setWhatsappId(id);
    setLoading(true);

    try {
      const responseData = await VendorAPI.whatsappGet(id);
      if (responseData.apiStatus.code === "200") {
        const data = responseData?.responseData;
        setNames(data?.name);
        setLaguageCode(data?.language);
        setLangName(data?.language);
        setCategory(data?.category);

        const componentFormat = data?.components?.[0]?.format?.toLowerCase();
        if (componentFormat) {
          setSelectedValue(componentFormat);
          setHeaderType(componentFormat);
          setLoading(false);
        }
        const bodyText = data?.components?.[1]?.text;
        if (bodyText) {
          setBodyTextValues(bodyText);
          setLoading(false);
        }
        data?.components?.forEach((component: any) => {
          switch (component.type) {
            case "HEADER":
              setTextInput(component?.text);
              setHeaderTextInput(component?.text);
              setLoading(false);
              if (
                component?.example?.header_text?.[0] ||
                component?.example?.header_handle?.[0]
              ) {
                setIsAddDisabled(true);
                setImgValue(component?.example?.header_handle?.[0]);
                setFormValue((prev) => ({
                  name: component?.example?.header_text?.[0],
                  value: "1",
                }));
              }
              break;
            case "BODY":
              let output = component.text;
              output = output.replace(/\*(.*?)\*/g, "<strong>$1</strong>");
              output = output.replace(/_(.*?)_/g, "<em>$1</em>");
              output = output.replace(/~(.*?)~/g, "<strike>$1</strike>");
              output = output.replace(/\n/g, "<br>");
              setBodyTextInput(output);

              setLoading(false);
              if (component?.text && component?.example?.body_text[0]) {
                setbodychildTextInput(component?.example?.body_text[0]);
                const newValues = component?.example?.body_text[0]?.map(
                  (item: string, index: number) => ({
                    value: `{{${index + 1}}}`, // Dynamic name based on index
                    name: item, // Item value from bodyText
                  })
                );
                setBodyFormValues([...newValues]);
                setLoading(false);
                if (editorInstance) {
                  editorInstance.setData(component?.text);
                }
              } else if (component?.text) {
                setbodychildTextInput(component?.text);
                setLoading(false);
              }
              break;
            case "FOOTER":
              setLoading(false);
              setFooterTextInput(component?.text);
              break;
            
            case "BUTTONS":
  setLoading(false);

  if (component?.buttons?.length > 0) {
    const newButtonOrder: any[] = component.buttons.map((btn: any) => {
      if (btn.type === "URL") {
        const isDynamic =
          (btn.url && btn.url.includes("{{")) || (btn.example && btn.example.length > 0);
        return isDynamic
          ? { type: "DYNAMIC_URL", data: { text: btn.text, url: btn.url, example: btn.example || [""] } }
          : { type: "URL", data: { text: btn.text, url: btn.url } };
      }

      if (btn.type === "COPY_CODE") {
        return { type: "COPY_CODE", data: { example: btn.example ? [btn.example] : [""] } };
      }

      if (btn.type === "PHONE_NUMBER") {
        return { type: "PHONE_NUMBER", data: { text: btn.text, phone_number: btn.phone_number } };
      }

      if (btn.type === "QUICK_REPLY") {
        return { type: "QUICK_REPLY", data: { text: btn.text } };
      }

      return null;
    }).filter(Boolean);

    setButtonOrder(newButtonOrder);
    setbuttonActive(true);
  }
  break;

            default:
              break;
          }
        });
      } else {
        setLoading(false);
        // Handle API error (optional)
        // toast.error(`get failed: ${responseData.apiStatus.message}`);
      }
    } catch (error) {
      console.error("Error during API call:", error);
      setLoading(false);
    }
  };

  const languageCodeDropdwon = () => {
    VendorAPI.languageCodeDropdown()
      .then((responceData: any) => {
        if (responceData.apiStatus.code === "200") {
          setlangCodeDrop(responceData?.responseData);
        }
      })
      .catch((error: any) => {
        console.error("Error during login:", error);
      });
  };
  //Dropdown Filter
  const filteredLangCodeDrop = langCodeDrop.filter((dropdownValue) =>
    (dropdownValue?.language_name || "")
      .toLowerCase()
      .includes((langName || "").toLowerCase())
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

      if (selectedFile) {
      const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
      const validVideoTypes = ["video/mp4", "video/webm", "video/ogg"];
      const validTypes = [...validImageTypes, ...validVideoTypes];

      if (!validTypes.includes(selectedFile.type)) {
        if (selectedFile.type.startsWith("image/")) {
          toast.error("Only JPG, JPEG, and PNG image files are allowed.");
        } else if (selectedFile.type.startsWith("video/")) {
          toast.error("Only MP4, WEBM, and OGG video files are allowed.");
        } else {
          toast.error("Unsupported file type selected.");
        }
        return;
      }
      if (
        file &&
        selectedFile.name === file.name &&
        selectedFile.size === file.size &&
        selectedFile.lastModified === file.lastModified
      ) {
        console.log("Same file selected, skipping upload.");
      } else {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        handleImgUpload(selectedFile);
      }
      const imagePreviewUrl = URL.createObjectURL(selectedFile);
      setImageUrl(imagePreviewUrl);
    }
  };

  const handleImgUpload = async (file: File) => {
    if (!file) {
      toast.error("Please select a file to import.");
      return;
    }
    const formData = new FormData();
    formData.append("media_file", file);
    try {
      const response = await VendorAPI.whatsappImgUploadAPI(formData);
      if (response?.apiStatus?.code === "200") {
        setImgValue(response?.responseData?.h);
        setImgid(response?.responseData?.id);
        toast.success(response?.apiStatus?.message);
        return {
          h: response.responseData.h,
          id: response.responseData.id,
        };
      } else {
        toast.error(response.apiStatus?.message);
      }
    } catch (error) {
      console.error("Import Error:", error);
      toast.error("An error occurred while importing the file.");
    }
  };
//Group Dropdown
interface GroupDrop {
   id: string;
   group_name: string;
}
const [groupName, setGroupName] = useState<any[]>([]);
const [groupId, setGroupId] = useState<string[]>([]);
const [flowDropDown, setflowDropDown] = useState<any[]>([
    {
                "id": "1",
                "group_name": "Sign up",
                "icon":"fa-solid fa-arrow-right-to-bracket"
            },
            {
                "id": "2",
                "group_name": "Sign in",
                "icon":"fa-solid fa-right-to-bracket"
            },
            {
                "id": "3",
                "group_name": "Appointment booking",
                "icon":"fa-regular fa-calendar-check"
            },
            {
                "id": "4",
                "group_name": "Lead generation",
                "icon":"fa-regular fa-newspaper"
            },
            {
                "id": "5",
                "group_name": "Shopping",
                "icon":"fa-solid fa-bag-shopping"
            },
            {
                "id": "6",
                "group_name": "Contact us",
                "icon":"fa-regular fa-address-book"
            },
            {
                "id": "7",
                "group_name": "Contact support",
                "icon":"fa-regular fa-address-card"
            },
            {
                "id": "8",
                "group_name": "Survey",
                "icon":"fa-solid fa-square-poll-horizontal"
            },
            {
                "id": "9",
                "group_name": "Other",
                "icon":"fa-solid fa-bars-staggered"
            },
])
   const handleGetGroupDrop = (e: React.MouseEvent<HTMLInputElement>) => {
  setOpen((prev) => {
    const newState = !prev;

    // If dropdown is closing → blur the input so label returns to center
    if (!newState) {
      (e.target as HTMLInputElement).blur();
    }

    return newState;
  });

  // Your API call
  // VendorAPI.contactGroupDropdownAPI()
  //   .then((responseData: any) => {
  //     if (responseData.apiStatus.code === "200") {
  //     } else {
  //       toast.error(responseData.apiStatus.message);
  //     }
  //   })
    // .catch((error: any) => {
    //   setLoading(false);
    //   console.error("Error while fetching group dropdown data:", error);
    //   toast.error("An error occurred while fetching group dropdown data.");
    // });
};

   const handleSelectGroup = (dropdownValue: GroupDrop) => {
      const alreadySelected = groupName.some(item => item.groupId === dropdownValue.id);;
      if (alreadySelected) {
         setGroupName(groupName.filter(group => group.groupId !== dropdownValue.id));
         setGroupId(groupId.filter(id => id !== dropdownValue.id));
      } else {
         setGroupName([...groupName, { groupId: dropdownValue.id, groupName: dropdownValue.group_name }]);
         setGroupId([...groupId, dropdownValue.id]);
      }
   };
   const handleSelectGroupName = (groupdetails: any) => {
      setGroupName(prevGroupName => prevGroupName.filter(item => item.groupId !== groupdetails.groupId))
   }
  useEffect(() => {
    languageCodeDropdwon();
  }, []);




// new fun















  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <DashboardLayout>
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <TopNav />
        <div className="container-fluid py-1">
          <div className="row">
            <div className="col-md-4 text-start mt-1">
              <h4>
                  <svg
                        fill="#004aad"
                        viewBox="0 0 32 32"
                        id="icon"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{width: "35px",height: '30px'}}>
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                        <defs>
                            <style>{`.cls-1{fill:none;}`}</style>
                        </defs>
                        <path d="M10,10H2V2h8ZM4,8H8V4H4Z" />
                        <path d="M30,30H22V22h8Zm-6-2h4V24H24Z" />
                        <path d="M20,27H8A6,6,0,0,1,8,15v2a4,4,0,0,0,0,8H20Z" />
                        <path d="M24,17V15a4,4,0,0,0,0-8H12V5H24a6,6,0,0,1,0,12Z" />
                        <path d="M19,11H13l-3,4,6,6,6-6Z" />
                        <rect
                            id="_Transparent_Rectangle_"
                            data-name="<Transparent Rectangle>"
                            className="cls-1"
                            width="13"
                            height="13"
                        />
                        </g>
                    </svg>
                {" "}
                {setValue === "whatsapp-flow"
                  ? "Create" + " Flow"
                  : "Edit" + " Flow"}
              </h4>
              <h3></h3>
            </div>
            <div className="col-md-8 text-end whatsapp-three-btn">
              {setValue == "create-whatsapp-template" ? (
                <>
                  <button
                    className="vendor-crt-btn"
                    onClick={() => navigate("/vendor/whatsapp-template")}
                  >
                    <i className="fa-solid fa-chevron-left"></i> Back to
                    Templates
                  </button>
                  <button
                    className="vendor-crt-btn"
                    onClick={() => navigate("")}
                  >
                    Help{" "}
                  </button>
                </>
              ) : (
                ""
              )}
              {/* Edit Condition */}
              {setValue === "edit-whatsapp-template" ? (
                <>
                  <button
                    className="vendor-crt-btn"
                    onClick={() => navigate("/vendor/whatsapp-template")}
                  >
                    <i className="fa-solid fa-chevron-left"></i> Back to
                    Templates
                  </button>
                  <button
                    className="vendor-crt-btn"
                    onClick={() => navigate("")}
                  >
                    Edit this Template on Meta{" "}
                    <i className="fas fa-external-link-alt"></i>
                  </button>
                  <button
                    className="vendor-crt-btn"
                    onClick={() => navigate("")}
                  >
                    Help
                  </button>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        {loading ? (
           <Loading/>
        ) : (
          <>
            <div className="vendor-maincontent container-fluid py-4">
              <div className="row">
                <div className="col-12">
                  <div className="card mb-4">
                    <div className="card-body px-0 pt-0 pb-2">
                      <form action="">
                        <div className="row">
                          <div
                            className="col-md-7 login-input-group"
                            style={{ padding: "25px" }}
                          >
                            <div className="vendor-create-container">
                              <input
                                type="text"
                                id="vendor-crt-input"
                                className="vendor-crt-input"
                                placeholder=" "
                                style={
                                  submit && names.length == 0
                                    ? { borderColor: "red" }
                                    : { borderColor: "" }
                                }
                                value={names}
                                autoComplete="off"
                                onChange={(e) => setNames(e.target.value)}
                              />
                              <label
                                htmlFor="vendor-crt-input"
                                className="vendor-crt-label"
                              >
                              <i className="fa-solid fa-code-merge"></i> Flow
                                Name
                              </label>
                            </div>
                            {submit && names.length == 0 ? (
                              <div className="text-danger error-message-required">
                                Flow name is required{" "}
                              </div> 
                            ) : (
                              <></>
                            )}
                            
                        {/* <div className="col-md-12 login-input-group">
                            <div
                                className="vendor-create-container dropdown"
                                ref={dropdownRef}
                            >
                                <div>
                                <input
                                    type="text"
                                    id="vendor-crt-input"
                                    readOnly
                                    value={groupName.map((g) => g.groupName).join(", ")}
                                    className="vendor-crt-input"
                                    placeholder=" "
                                   onClick={(e) => handleGetGroupDrop(e)}
                                   style={
                                  submit && groupName.length == 0
                                    ? { borderColor: "red" }
                                    : { borderColor: "" }
                                }
                                />

                                <label htmlFor="vendor-crt-input" className="vendor-crt-label">
                                    <i className="fa-solid fa-code-compare"></i> Flow Categories
                                </label>

                                <i className="dropdown-icon font-size-dash-arrow fa-solid fa-chevron-down"></i>
                                </div>

                                <ul
                                className={`contatStore-dropdown-menu template-dropdown dropdown-menu dropdown-menuz ${open ? "show" : ""}`}
                                >
                                {flowDropDown?.map((dropdownValue, id) => {
                                    const isSelected = groupName.some(
                                    (g) => g.groupName === dropdownValue.group_name
                                    );

                                    return (
                                    <li key={id}>
                                        <a
                                        className="dropdown-item d-flex justify-content-between align-items-center"
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleSelectGroup(dropdownValue);
                                        }}
                                        >
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <i className={dropdownValue.icon} style={{ marginRight: "8px" }}></i>
                                            {dropdownValue.group_name}
                                        </div>

                                        {isSelected && (
                                            <i className="fa-solid fa-check" style={{ color: "#0cc0df" }}></i>
                                        )}
                                        </a>
                                    </li>
                                    );
                                })}
                                </ul>
                            </div>
                            {groupName.map((item, index) => (
                                <div
                                className="border mt-1 px-1"
                                key={index}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    marginBottom: "5px",
                                    marginRight: "10px",
                                    borderRadius: "5px",
                                    boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
                                }}
                                >
                                <span style={{ marginRight: "4px", fontSize: "10px" }}>
                                    {item.groupName}
                                </span>

                                <button
                                    style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "10px",
                                    color: "#a1a1a1",
                                    padding: 0,
                                    }}
                                    onClick={(e) => {handleSelectGroupName(item);e.stopPropagation();e.preventDefault();}}
                                >
                                    <i className="fa-solid fa-xmark group-xmark"></i>
                                </button>
                                </div>
                            ))}
                            </div>
                              {submit && groupName.length == 0 ? (
                              <div className="text-danger error-message-required">
                                Flow categories is required{" "}
                              </div> 
                            ) : (
                              <></>
                            )} */}
                            <div className="row">
                                <div className="col-md-6 login-input-group">
                                  <div className="vendor-create-container">
                                    <div>
                                      <input
                                        type="text"
                                        id="vendor-crt-input"
                                        value={keyWord}
                                        onChange={(e) => setKeyWord(e.target.value)}
                                        className="vendor-crt-input"
                                        placeholder=" "
                                        style={
                                          submit && !keyWord
                                            ? { borderColor: "red" }
                                            : { borderColor: "" }
                                        }
                                      />

                                      <label htmlFor="vendor-crt-input" className="vendor-crt-label">
                                        <i className="fa-solid fa-key"></i>  Keyword
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                {submit && keyWord.length == 0 ? (
                                  <div className="text-danger error-message-required">
                                    Keyword is required{" "}
                                  </div>
                                ) : (
                                  <></>
                                )}
                                <div className="col-md-6 login-input-group">
                                  <div className="vendor-create-container">
                                    <div>
                                      <input
                                        type="text"
                                        id="vendor-crt-input"
                                        value={buttonText}
                                        onChange={(e) => setButtonText(e.target.value)}
                                        className="vendor-crt-input"
                                        placeholder=" "
                                        style={
                                          submit && !buttonText
                                            ? { borderColor: "red" }
                                            : { borderColor: "" }
                                        }
                                      />

                                      <label htmlFor="vendor-crt-input" className="vendor-crt-label">
                                        <i className="fa-solid fa-toggle-on"></i>  Button Text
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                {submit && buttonText.length == 0 ? (
                                  <div className="text-danger error-message-required">
                                    Button text is required{" "}
                                  </div>
                                ) : (
                                  <></>
                                )}
                            </div>
                              <div className="col-md-12 login-input-group">
                                <div className="vendor-create-container">
                                  <div>
                                    <input
                                      type="text"
                                      id="vendor-crt-input"
                                      value={otherKeywords}
                                      onChange={(e) => setOtherKeywords(e.target.value)}
                                      className="vendor-crt-input"
                                      placeholder=""
                                      style={
                                        submit && !otherKeywords
                                          ? { borderColor: "red" }
                                          : { borderColor: "" }
                                      }
                                    />

                                    <label htmlFor="vendor-crt-input" className="vendor-crt-label">
                                      <i className="fa-solid fa-tags"></i>  Other Keywords
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12 login-input-group">
                                <div
                                  className="vendor-create-container dropdown"
                                  ref={dropdownRef}
                                >
                                  <div>
                                    <input
                                      type="text"
                                      id="vendor-crt-input"
                                      readOnly
                                      value={groupName.map((g) => g.groupName).join(", ")}
                                      className="vendor-crt-input"
                                      placeholder=" "
                                      onClick={(e) => handleGetGroupDrop(e)}
                                      style={
                                        submit && groupName.length == 0
                                          ? { borderColor: "red" }
                                          : { borderColor: "" }
                                      }
                                    />

                                    <label htmlFor="vendor-crt-input" className="vendor-crt-label">
                                      <i className="fa-solid fa-right-left"></i> Costom Method Response
                                    </label>

                                    <i className="dropdown-icon font-size-dash-arrow fa-solid fa-chevron-down"></i>
                                  </div>

                                  <ul
                                    className={`contatStore-dropdown-menu template-dropdown dropdown-menu dropdown-menuz ${open ? "show" : ""}`}
                                  >
                                    {flowDropDown?.map((dropdownValue, id) => {
                                      const isSelected = groupName.some(
                                        (g) => g.groupName === dropdownValue.group_name
                                      );

                                      return (
                                        <li key={id}>
                                          <a
                                            className="dropdown-item d-flex justify-content-between align-items-center"
                                            href="#"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              handleSelectGroup(dropdownValue);
                                            }}
                                          >
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                              <i className={dropdownValue.icon} style={{ marginRight: "8px" }}></i>
                                              {dropdownValue.group_name}
                                            </div>

                                            {isSelected && (
                                              <i className="fa-solid fa-check" style={{ color: "#0cc0df" }}></i>
                                            )}
                                          </a>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                                {groupName.map((item, index) => (
                                  <div
                                    className="border mt-1 px-1"
                                    key={index}
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      marginBottom: "5px",
                                      marginRight: "10px",
                                      borderRadius: "5px",
                                      boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
                                    }}
                                  >
                                    <span style={{ marginRight: "4px", fontSize: "10px" }}>
                                      {item.groupName}
                                    </span>

                                    <button
                                      style={{
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        fontSize: "10px",
                                        color: "#a1a1a1",
                                        padding: 0,
                                      }}
                                      onClick={(e) => { handleSelectGroupName(item); e.stopPropagation(); e.preventDefault(); }}
                                    >
                                      <i className="fa-solid fa-xmark group-xmark"></i>
                                    </button>
                                  </div>
                                ))}
                              </div>
                              <div className="col-md-12 login-input-group">
                                <div className="vendor-create-container position-relative" >
                                  <div>
                                    <input
                                      type="text"
                                      id="vendor-crt-input"
                                      value={hederText}
                                      maxLength={24}
                                      onChange={(e) => setHederText(e.target.value)}
                                      onFocus={() => setIsFocusedHeder(true)}
                                      onBlur={() => setIsFocusedHeder(false)}
                                      className="vendor-crt-input"
                                      placeholder=""
                                      style={
                                        submit && !hederText
                                          ? { borderColor: "red" }
                                          : { borderColor: "" }
                                      }
                                    />
                                    <span
                                      style={{
                                        position: "absolute",
                                        right: "10px",
                                        bottom: "11px",
                                        fontSize: "11px",
                                        color: "#9ca3af",
                                        pointerEvents: "none",
                                      }}
                                    >
                                      {hederText.length} / 24
                                    </span>
                                    <label htmlFor="vendor-crt-input" style={isFocusedHeder || hederText ? { top: "0px" } : { }} className="vendor-crt-label">
                                      <i className="fa-solid fa-text-height"></i> Header Text
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12 login-input-group">
                                <div className="vendor-create-container position-relative">
                                  <div>
                                    <textarea
                                      id="vendor-crt-input"
                                      value={bodyText}
                                      maxLength={512}
                                      onChange={(e) => setBodytext(e.target.value)}
                                      onFocus={() => setIsFocusedBody(true)}
                                      onBlur={() => setIsFocusedBody(false)}
                                      className="vendor-crt-input"
                                      placeholder=""
                                      style={
                                        submit && !bodyText
                                          ? { borderColor: "red" }
                                          : { borderColor: "" }
                                      }
                                    />
                                    <span
                                      style={{
                                        position: "absolute",
                                        right: "10px",
                                        bottom: "-11px",
                                        fontSize: "11px",
                                        color: "#9ca3af",
                                        pointerEvents: "none",
                                      }}
                                    >
                                      {bodyText.length} / 512
                                    </span>
                                    <label
                                      htmlFor="vendor-crt-input"
                                      style={isFocusedBody || bodyText ? { top: "0px" } : {}}
                                      className="vendor-crt-label"
                                    >
                                      <i className="fa-solid fa-paragraph"></i> Body Text
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12 login-input-group">
                                <div className="vendor-create-container">
                                  <span className="mb-2 fs-6 fw-bold">Enable endpoint URI</span>
                                  <div className="fs-6" style={{
                                    display: "flex",
                                    justifyContent: "start",
                                  }}>
                                    <input
                                      type="checkbox"
                                      id="vendor-crt-input"
                                      checked={checkBox}
                                      onChange={(e) => setCheckBox(e.target.checked)}
                                      className="vendor-crt-input"
                                      style={{
                                        width: "3%",
                                        margin: "6px"
                                      }}
                                    />
                                    Enable to send data to your endpoint URI
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12 login-input-group">
                                <div className="vendor-create-container">
                                  <p className="header mt-0">Flow Response Settings</p>
                                  <div className="promotionSMS-container mt-0 justify-content-center">

                                    {/* Image Radio */}
                                    <div className="promotionSMS mt-4">
                                      <input
                                        type="radio"
                                        id="image"
                                        name="smsType"
                                        value="Image"
                                        className="sms-radio mt-0"
                                        onClick={() => setFlowRadio("Image")}
                                      />
                                      <label htmlFor="image" className="sms-label mb-0">
                                        <span>Image</span>
                                      </label>
                                    </div>

                                    {/* Video Radio */}
                                    <div className="promotionSMS mt-4">
                                      <input
                                        type="radio"
                                        id="video"
                                        name="smsType"
                                        value="Video"
                                        className="sms-radio mt-0"
                                        onClick={() => setFlowRadio("Video")}
                                      />
                                      <label htmlFor="video" className="sms-label mb-0">
                                        <span>Video</span>
                                      </label>
                                    </div>

                                    {/* Document Radio */}
                                    <div className="promotionSMS mt-4">
                                      <input
                                        type="radio"
                                        id="document"
                                        name="smsType"
                                        value="Document"
                                        className="sms-radio mt-0"
                                        onClick={() => setFlowRadio("Document")}
                                      />
                                      <label htmlFor="document" className="sms-label mb-0">
                                        <span>Document</span>
                                      </label>
                                    </div>
                                  </div>

                                  {/* Dynamic File Input */}
                                
                                   
                                 
                                  {flowRedio && (
                                  <div className="col-md-12 login-input-group">
                                    <div className="vendor-create-container">
                                      <div>
                                        <input
                                            type="file"
                                          id="vendor-crt-input"
                                         
                                          className="vendor-crt-input"
                                            accept={
                                              flowRedio === "Image"
                                                ? "image/*"
                                                : flowRedio === "Video"
                                                  ? "video/*"
                                                  : flowRedio === "Document"
                                                    ? ".pdf,.doc,.docx,.txt"
                                                    : ""
                                            }
                                          
                                        />

                                        <label htmlFor="vendor-crt-input" className="vendor-crt-label">
                                            {flowRedio === "Image" && <i className="fa-solid fa-image"></i>}
                                            {flowRedio === "Video" && <i className="fa-solid fa-video"></i>}
                                            {flowRedio === "Document" && <i className="fa-solid fa-file"></i>}
                                            <span style={{ marginLeft: "6px" }}>{flowRedio} Upload</span>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  )}
                                </div>
                              </div>



                              <div className="col-md-12 login-input-group">
                                <div className="vendor-create-container position-relative">
                                  <div>
                                    <textarea
                                      id="vendor-crt-input"
                                      value={flowText}
                                      maxLength={1024}
                                      onChange={(e) => setFlowText(e.target.value)}
                                      onFocus={() => setIsFocusedFlow(true)}
                                      onBlur={() => setIsFocusedFlow(false)}
                                      className="vendor-crt-input"
                                      placeholder=""
                                      style={
                                        submit && !flowText
                                          ? { borderColor: "red" }
                                          : { borderColor: "" }
                                      }
                                    />
                                    <span
                                      style={{
                                        position: "absolute",
                                        right: "10px",
                                        bottom: "-11px",
                                        fontSize: "11px",
                                        color: "#9ca3af",
                                        pointerEvents: "none",
                                      }}
                                    >
                                      {flowText.length} / 1024
                                    </span>
                                    <label
                                      htmlFor="vendor-crt-input"
                                      style={isFocusedFlow || flowText ? { top: "0px" } : {}}
                                      className="vendor-crt-label"
                                    >
                                      <i className="fa-solid fa-comments"></i> Flow Response Text
                                    </label>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-12 login-input-group">
                                <div className="vendor-create-container">
                                  <div>
                                    <input
                                      type="text"
                                      id="vendor-crt-input"
                                      value={addButton}
                                      onChange={(e) => setAddButton(e.target.value)}
                                      className="vendor-crt-input"
                                      placeholder=""
                                    />

                                    <label htmlFor="vendor-crt-input" className="vendor-crt-label">
                                    <i className="fa-solid fa-circle-plus"></i>  Add Button
                                    </label>
                                  </div>
                                </div>
                              </div>





                          </div>


                          {/* flow preview */}
                          <div className="col-md-5 sticky-top h-100">
                            <h5 className="mt-4 ms-3">Flow Preview</h5>
                            <div className="text-end">
                              <div className="template-preview px-2">
                                <div className="conversation">
                                  <div className="conversation-container">
                                    <div className="message received z-0">
                                        {true && ( 
                                <div className="main-container-carousel">
                                 <div className="carousel-container">
                                <div className="wrapper conversation-container">
                                    <div className="slider-wrapper">
                                    <div
                                        className="inner"
                                        style={{ width: `${slides.length * 100}%`, transform: `translateX(-${currentIndex * (100 / slides.length)}%)` }}
                                    >
                                        {slides.map((slide:any, index:any) => (
                                        <article key={index} style={{ width: `${100 / slides.length}%` }}>
                                            {slide.type === 'image' ? (
                                              <img src={slide.src} alt={`Slide ${index}`} />
                                            ) : (
                                              <video src={slide.src} controls />
                                            )}
                                        </article>
                                        ))}
                                    </div>
                                    </div>
                                    {slides && slides.length >= 2 && (
                                    <div className="slider-nav-buttons">
                                    <button onClick={(e)=>{prevSlide();e.preventDefault()}}>❮</button>
                                    <button onClick={(e)=>{nextSlide();e.preventDefault()}}>❯</button>
                                    </div>)}
                                    <div className="slider-dot-control">
                                    {slides.map((_:any, index:any) => (
                                        <span
                                        key={index}
                                        className={index === currentIndex ? 'active-dot' : ''}
                                        onClick={() => setCurrentIndex(index)}
                                        />
                                    ))}
                                    </div>
                                    
                                    </div>
                                    {slides[currentIndex] && slides[currentIndex].bodyText && (
                                    <div key={slides[currentIndex].id}>
                                        <p
                                        style={{ textAlign: "justify", fontSize: "14px", padding: "0 5px" }}
                                        dangerouslySetInnerHTML={{
                                            __html: slides[currentIndex].bodyText
                                            .replace(/\*(.*?)\*/g, "<b>$1</b>")
                                            .replace(/_(.*?)_/g, "<i>$1</i>")
                                            .replace(/~(.*?)~/g, "<strike>$1</strike>")
                                            .replace(/\n/g, "<br>"),
                                        }}
                                        ></p>
                                        </div>)}
                                        {/* Render buttons if available */}
                                        {slides[currentIndex] && slides[currentIndex].buttons && (
                                        <div className="template-buttontxt">
                                            {slides[currentIndex].buttons.map((button: any, idx: number) => {
                                            let icon = null;

                                            if (button.type === "quick_reply") {
                                                icon = <i className="fa-solid fa-reply bt-1"></i>;
                                            } else if (button.type === "phone_number") {
                                                icon = <i className="fa-solid fa-phone"></i>;
                                            } else if (button.type === "url") {
                                                icon = <i className="fa-solid fa-square-arrow-up-right"></i>;
                                            }

                                            return (
                                                <p
                                                key={idx}
                                                className="template-buttontxt button-option-style text-center"
                                                >
                                                {icon} {button.text}
                                                </p>
                                            );
                                            })}
                                        </div>
                                        )}
                                    </div>
                                   

                               
                                </div>)}
                                      {/* <span className="metadata"><span className="time"></span></span> */}
                                      {headerType && BodyType && footerType && (
                                        <div className="lw-whatsapp-header-placeholder header-value-right-side text-start">
                                          {headerType === "text" && (
                                            <p className="template-headertxt fw-bold">
                                              {textInput}
                                            </p>
                                          )}

                                          {headerType === "video" && (
                                            <div
                                              style={{
                                                display: "flex",
                                                // padding: "35px",
                                                justifyContent: "center",
                                                alignItems: "center",
                                              }}
                                            >
                                              <video className="w-100 rounded" src={imageUrl || imgValue} controls autoPlay loop playsInline></video>
                                              {/* <i className="fa fa-5x fa-play-circle"></i> */}
                                            </div>
                                          )}
                                          {headerType === "image" && (
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                              }}
                                            >
                                              {/* <i className="fa fa-5x fa-image text-white"></i> */}
                                              <img
                                                className="w-100 rounded"
                                                src={imageUrl || imgValue}
                                                alt=""
                                              />
                                            </div>
                                          )}

                                          {headerType === "location" && (
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                padding: "35px",
                                                background: "gainsboro",
                                              }}
                                            >
                                              <i className="fa fa-5x fa-map-marker-alt text-white"></i>
                                            </div>
                                          )}

                                          {headerType === "document" && (
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                padding: "35px",
                                                background: "gainsboro",
                                              }}
                                            >
                                              <i className="fa fa-5x fa-file-alt text-white"></i>
                                            </div>
                                          )}
                                          <div>
                                            {(BodyType === "None" ||
                                              BodyType === "text" ||
                                              BodyType === "image" ||
                                              BodyType === "video" ||
                                              BodyType === "document" ||
                                              BodyType === "location" ||
                                              BodyType === "carousel") && (
                                              <p
                                                className="template-bodytxt mt-3"
                                                dangerouslySetInnerHTML={{
                                                  __html: BodytextInput.replace(
                                                    /\*(.*?)\*/g,
                                                    "<b>$1</b>"
                                                  )
                                                    .replace(
                                                      /_(.*?)_/g,
                                                      "<i>$1</i>"
                                                    )
                                                    .replace(
                                                      /~(.*?)~/g,
                                                      "<strike>$1</strike>"
                                                    )
                                                    .replace(/\n/g, "<br>"),
                                                }}
                                              ></p>
                                            )}
                                          </div>
                                          <div>
                                            {(footerType === "None" ||
                                              footerType === "text" ||
                                              footerType === "image" ||
                                              footerType === "video" ||
                                              footerType === "document" ||
                                              footerType === "location") && (
                                              <p className="template-footertxt">
                                                {footertextInput}
                                              </p>
                                            )}
                                          </div>
                                          <div className="template-buttontxt">
                                            {buttonOrder.slice(0, 3).map((btn, index) => {
                                                switch (btn.type) {
                                                case "QUICK_REPLY":
                                                    return (
                                                    <p key={index} className="template-buttontxt button-option-style text-center">
                                                        <i className="fa-solid fa-reply bt-1"></i> {btn.data.text || ""}
                                                    </p>
                                                    );

                                                case "URL":
                                                case "DYNAMIC_URL":
                                                    return (
                                                    <p key={index} className="template-buttontxt button-option-style text-center">
                                                        <i className="fa-solid fa-square-arrow-up-right"></i> {btn.data.text || ""}
                                                    </p>
                                                    );

                                                case "PHONE_NUMBER":
                                                    return (
                                                    <p key={index} className="template-buttontxt button-option-style text-center">
                                                        <i className="fa-solid fa-phone"></i> {btn.data.text}
                                                    </p>
                                                    );

                                                case "COPY_CODE":
                                                    return (
                                                    <p key={index} className="template-buttontxt button-option-style text-center">
                                                        <i className="fa-solid fa-copy"></i> Copy Code
                                                    </p>
                                                    );

                                                default:
                                                    return null;
                                                }
                                            })}

                                            {buttonOrder.length > 3 && (
                                                <>
                                                {/* 4th place: See all options */}
                                                <hr style={{background: "#c9c9c9"}}/>
                                                <p className="template-buttontxt button-option-style text-center">
                                                    <div className="list-group-item">
                                                    <i className="fa-solid fa-list-ul"></i> See all options <br />
                                                    <small className="text-orange" style={{ color: "#fb6340" }}>
                                                        More than 3 buttons will be shown in the list by <br />clicking
                                                    </small>
                                                    </div>
                                                </p>

                                                {/* Remaining buttons */}
                                                {buttonOrder.slice(3).map((btn, index) => {
                                                    const realIndex = index + 3; // adjust index
                                                    switch (btn.type) {
                                                    case "QUICK_REPLY":
                                                        return (
                                                        <p key={realIndex} className="template-buttontxt button-option-style text-center">
                                                            <i className="fa-solid fa-reply bt-1"></i> {btn.data.text || ""}
                                                        </p>
                                                        );

                                                    case "URL":
                                                    case "DYNAMIC_URL":
                                                        return (
                                                        <p key={realIndex} className="template-buttontxt button-option-style text-center">
                                                            <i className="fa-solid fa-square-arrow-up-right"></i> {btn.data.text || ""}
                                                        </p>
                                                        );

                                                    case "PHONE_NUMBER":
                                                        return (
                                                        <p key={realIndex} className="template-buttontxt button-option-style text-center">
                                                            <i className="fa-solid fa-phone"></i> {btn.data.text}
                                                        </p>
                                                        );

                                                    case "COPY_CODE":
                                                        return (
                                                        <p key={realIndex} className="template-buttontxt button-option-style text-center">
                                                            <i className="fa-solid fa-copy"></i> Copy Code
                                                        </p>
                                                        );

                                                    default:
                                                        return null;
                                                    }
                                                })}
                                                </>
                                            )}
                                            </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                
                                
                                </div>
                            </div>
                          </div>
                          <div className="whatsapp-btn text-center">
                            <button
                              onClick={vendorWhatsappTemplateCreate}
                              disabled={isLoading}
                              className="btn btn-primary "
                            >
                              {isLoading ? "Submit..." : "Submit"}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </>
        )}
      </main>
    </DashboardLayout>
  );
}

export default WhatsappFlowCreate;