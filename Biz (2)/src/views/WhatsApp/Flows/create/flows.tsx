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
import './flow.css'

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

  type Field = {
    type: "text" | "textarea" | "select" | "checkbox";
    label: string;             // always string
    isLabelEditing: boolean;   // always boolean
    options?: string[];        // only for select
    newOption?: string;        // only for select
    isOptionEditing?: boolean; // only for select
    selectedOptions: string[]; // only for select
    isOpen?: boolean;               // only for select
  };


  const [fields, setFields] = useState<Field[]>([]);








//chaeckbox content//
  const [allFields, setAllFields] = useState([
    {
      type: "checkbox",
      label: "Select Option",
      options: ["Option 1", "Option 2", "Option 3"],
      checked: false,   // <--- required
    },
  ]);




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
  const [slides, setslides] = useState<any>([]);
  console.log(slides, "SlidesCarousel")
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

  const optionsData = [
    "Apple", "Apricot", "Banana", "Blackberry", "Blueberry", "Cantaloupe",
    "Cherry", "Date", "Durian", "Eggplant", "Fig", "Grape",
    "Guava", "Huckleberry"
  ];
  const [options] = useState(optionsData);
  const [filtered, setFiltered] = useState(options);
  const [selected, setSelected] = useState<number[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);



  const inputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const idBase = "combo";
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!wrapperRef.current) return;

      const clickedOutside = !wrapperRef.current.contains(e.target as Node);
      if (clickedOutside) setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  /* ---------------------------
     Filtering behavior
  ---------------------------- */
  function onInputChange(value: string) {
    const results = options.filter(
      o => o.toLowerCase().indexOf(value.toLowerCase()) === 0
    );
    setFiltered(results);

    if (!results.includes(options[activeIndex])) {
      const first = options.indexOf(results[0]);
      onOptionChange(first);
    }

    setOpen(results.length > 0);
  }

  /* ---------------------------
     Option Change
  ---------------------------- */
  function onOptionChange(index: number) {
    if (index < 0) return;
    setActiveIndex(index);

    const listbox = listboxRef.current;
    if (listbox) {
      const optionEl = listbox.children[index] as HTMLElement;
      if (optionEl) optionEl.scrollIntoView({ block: "nearest" });
    }
  }

  /* ---------------------------
     Select / Remove options
  ---------------------------- */
  function toggleSelection(index: number) {
    if (selected.includes(index)) {
      setSelected(prev => prev.filter(i => i !== index));
    } else {
      setSelected(prev => [...prev, index]);
    }
  }

  /* ---------------------------
     Key Handling
  ---------------------------- */
  function handleKeyDown(e: React.KeyboardEvent) {
    const max = filtered.length - 1;
    const filteredIndex = filtered.indexOf(options[activeIndex]);

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) return setOpen(true);
        onOptionChange(
          options.indexOf(filtered[(filteredIndex + 1) % filtered.length])
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        onOptionChange(
          options.indexOf(filtered[(filteredIndex - 1 + filtered.length) % filtered.length])
        );
        break;

      case "Enter":
        e.preventDefault();
        toggleSelection(activeIndex);
        break;

      case "Escape":
        setOpen(false);
        break;

      default:
        break;
    }
  }

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
    setButtoncopyopt(copyButtons.length > 0 || total >= 10);
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
    setslides((prevSlides: any) => {
      const newSlides = [...prevSlides];
      const newSlide = {
        id,
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
  console.log(carousels, "Carousel")
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
        selectedValue === "carousel" ?
          {
            type: "carousel",
            cards: carousels.map(({ components }) => ({
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
          } : null
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

  useEffect(() => {
    languageCodeDropdwon();
  }, []);

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  const handleDrop = (e: React.DragEvent) => {
    const fieldType = e.dataTransfer.getData("field");

    let newField: Field;

    if (fieldType === "text") {
      newField = { type: "text", label: "", isLabelEditing: true, selectedOptions: [] };
    } else if (fieldType === "textarea") {
      newField = { type: "textarea", label: "", isLabelEditing: true, selectedOptions: [] };
    } else if (fieldType === "select") {
      newField = {
        type: "select",
        label: "",
        isLabelEditing: true,
        options: [],
        isOptionEditing: false,
        newOption: "",
        selectedOptions: []   // <--- add here
      };
    } else if (fieldType === "checkbox") {
      newField = {
        type: "checkbox",
        label: "",
        isLabelEditing: true,
        options: [],
        newOption: "",
        isOptionEditing: false,
        selectedOptions: []  // <--- add here
      };
    }
    else {
      return;
    }

    // Now TypeScript knows newField is always defined
    setFields(prev => [...prev, newField]);
  };







  return (
    <DashboardLayout>
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <TopNav />
        <style>{`
        html {
          --black: #000000;
          --focus-color: #0067b8;
          --light-gray: rgba(0,0,0,0.1);
          --medium-gray: rgba(0,0,0,0.4);
          --selected: #e3f2ff;
          --white: #ffffff;
          box-sizing: border-box;
          font-size: 100%;
        }
        .combo {
          position: relative;
        }
        .combo::after {
          content: '';
          position: absolute;
          top: 50%;
          right: 1rem;
          border-bottom: 2px solid var(--medium-gray);
          border-right: 2px solid var(--medium-gray);
          height: .5rem;
          width: .5rem;
          transform: translate(0,-65%) rotate(45deg);
          pointer-events: none;
        }
        [role="combobox"] {
          display: flex;
          flex-wrap: wrap;
          border: 2px solid var(--medium-gray);
          border-radius: .25rem;
          min-height: 48px;
          padding: .5rem;
          background: var(--white);
        }
        .combo-input {
          flex: 1 1 35%;
          border: none;
          min-height: 1.5rem;
          background: var(--white);
        }
        [role="listbox"] {
          position: absolute;
          top: 100%; left: 0;
          z-index: 100;
          display: none;
          border: 1px solid var(--medium-gray);
          border-radius: 0 0 .25rem .25rem;
          background: var(--white);
          list-style: none;
          margin: 0;
          padding: 0;
          max-height: 300px;
          overflow-y: scroll;
          width: 100%;
        }
        .open [role=listbox] {
          display: block;
        }

        [role="option"] {
          padding: .625rem .75rem .75rem;
          cursor: pointer;
        }
        [role="option"][aria-selected="true"] {
          background: var(--selected);
          position: relative;
          padding-right: 1.875rem;
        }
        [role="option"][aria-selected="true"]::after {
          content: '';
          position: absolute;
          right: 1rem;
          top: 50%;
          height: 1rem;
          width: .5rem;
          border-bottom: 2px solid black;
          border-right: 2px solid black;
          transform: translateY(-50%) rotate(45deg);
        }
        .option-current {
          background: var(--light-gray);
        }

        ul.selected-options {
          list-style: none;
          padding: 0;
          margin: 0 0 .25rem 0;
          display: flex;
          flex-wrap: wrap;
        }

        button.remove-option {
          position: relative;
          border: 1px solid var(--light-gray);
          border-radius: .25rem;
          padding: .25rem 1.75rem .25rem .25rem;
          background: var(--light-gray);
          font-size: .75rem;
          font-weight: 700;
          margin-right: .25rem;
          margin-bottom: .25rem;
        }
        button.remove-option::before,
        button.remove-option::after {
          content: '';
          position: absolute;
          right: .75rem;
          top: 50%;
          height: .75rem;
          border-right: 2px solid black;
          width: 0;
        }
        button.remove-option::before {
          transform: translateY(-50%) rotate(45deg);
        }
        button.remove-option::after {
          transform: translateY(-50%) rotate(-45deg);
        }

      `}</style>
        <div className="container-fluid py-1">
          <div className="row">
            <div className="col-md-4 text-start mt-1">
              <h4>
                <svg
                  fill="#004aad"
                  viewBox="0 0 32 32"
                  id="icon"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "35px", height: '30px' }}>
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
          <Loading />
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
                                required
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
                            <div className="vendor-create-container login-input-group">
                              <div
                                className="edit-container dropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <input
                                  type="text"
                                  id="vendor-crt-input"
                                  className="vendor-crt-input"
                                  placeholder=" "
                                  required
                                  style={
                                    submit && langName.length == 0
                                      ? { borderColor: "red" }
                                      : { borderColor: "" }
                                  }
                                  value={langName}
                                  onClick={languageCodeDropdwon}
                                  autoComplete="off"
                                  onChange={(e) => setLangName(e.target.value)}
                                />
                                <label
                                  htmlFor="vendor-crt-input"
                                  className="vendor-crt-label"
                                >
                                  <i className="fa-solid fa-code-compare"></i>{" "}
                                  Flow Categories
                                </label>
                                <i className="dropdown-icon font-size-dash-arrow fa-solid fa-chevron-down"></i>
                                <ul className="dropdown-menu template-dropdown w-100">
                                  {filteredLangCodeDrop.length === 0 ? (
                                    <li className="dropdown-nodata-found">
                                      No data found
                                    </li>
                                  ) : (
                                    filteredLangCodeDrop.map(
                                      (dropdownValue, id) => (
                                        <li key={id}>
                                          <a
                                            className="dropdown-item"
                                            href="#"
                                            onClick={() => {
                                              setLaguageCode(
                                                dropdownValue?.language_code
                                              );
                                              setLangName(
                                                dropdownValue?.language_name
                                              );
                                            }}
                                          >
                                            {dropdownValue?.language_name}
                                          </a>
                                        </li>
                                      )
                                    )
                                  )}
                                </ul>
                              </div>
                              {submit && langName.length == 0 ? (
                                <div className="text-danger error-message-required">
                                  Flow categories is required{" "}
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className={`combo js-inline-buttons ${open ? "open" : ""}`} ref={wrapperRef}>
                              <label id="combo-label">Multiselect with inline buttons</label>

                              <div className="multiselect-inline"
                                role="combobox"
                                aria-expanded={open}
                                aria-haspopup="listbox"
                                aria-owns="listbox">

                                {/* Selected chips */}
                                <ul id="combo-selected" className="selected-options">
                                  {selected.map(index => (
                                    <li key={index}>
                                      <button
                                        className="remove-option"
                                        onClick={() => toggleSelection(index)}
                                      >
                                        {options[index]}
                                      </button>
                                    </li>
                                  ))}
                                </ul>

                                {/* Input */}
                                <input
                                  id={idBase}
                                  className="combo-input"
                                  type="text"
                                  ref={inputRef}
                                  onChange={(e) => onInputChange(e.target.value)}
                                  onKeyDown={handleKeyDown}
                                  onClick={() => setOpen(true)}
                                  aria-activedescendant={`${idBase}-${activeIndex}`}
                                  aria-autocomplete="list"
                                  aria-labelledby="combo-label combo-selected"
                                />
                              </div>

                              {/* Listbox */}
                              <ul
                                id="listbox"
                                role="listbox"
                                aria-multiselectable="true"
                                ref={listboxRef}
                              >
                                {options.map((opt, index) => {
                                  const show = filtered.includes(opt);
                                  const selectedState = selected.includes(index);

                                  return (
                                    <li
                                      key={index}
                                      id={`${idBase}-${index}`}
                                      role="option"
                                      style={{ display: show ? "block" : "none" }}
                                      className={`${activeIndex === index ? "option-current" : ""}`}
                                      aria-selected={selectedState}
                                      onMouseDown={() => { }}
                                      onClick={() => toggleSelection(index)}
                                    >
                                      {opt}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>


                            {/* flow work start */}

                            <div className="mt-4 row flow-buttons">
                              {/* LEFT BUTTONS */}
                              <div className="col-md-3 d-flex flex-column gap-2">
                                <button
                                  draggable
                                  className="btn"
                                  onDragStart={(e) => e.dataTransfer.setData("field", "text")}
                                >
                                  Text
                                </button>

                                <button
                                  draggable
                                  className="btn"
                                  onDragStart={(e) => e.dataTransfer.setData("field", "textarea")}
                                >
                                  Textarea
                                </button>

                                <button
                                  draggable
                                  className="btn"
                                  onDragStart={(e) => e.dataTransfer.setData("field", "select")}
                                >
                                  Select
                                </button>
                                  <button
                                    draggable
                                    className="btn"
                                    onDragStart={(e) => e.dataTransfer.setData("field", "checkbox")}
                                  >
                                    checkbox
                                  </button>
                              </div>

                              {/* RIGHT FIELD AREA */}
                              <div
                                className="col-md-9 border p-3"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleDrop}
                                style={{ minHeight: "250px" }}
                              >
                                {fields.map((item, index) => (
                                  <div key={index} className="mb-3">

                                    {/* TEXT FIELD */}
                                    {item.type === "text" && (
                                      <div>
                                        {item.isLabelEditing ? (
                                          /* BEFORE SAVE – input box + tick */
                                          <div className="d-flex align-items-center mb-2">
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="Enter label"
                                              value={item.label}
                                              onChange={(e) => {
                                                const updated = [...fields];
                                                updated[index].label = e.target.value;
                                                setFields(updated);
                                              }}
                                              autoFocus
                                            />
                                            <i
                                              className="fa fa-circle-check text-success ms-2"
                                              style={{ cursor: "pointer", fontSize: "14px" }}
                                              onClick={() => {
                                                const updated = [...fields];
                                                updated[index].isLabelEditing = false; // SAVE
                                                setFields(updated);
                                              }}
                                            ></i>
                                          </div>
                                        ) : (
                                          /* AFTER SAVE – only label + edit icon (NO disabled input) */
                                          <div className="d-flex justify-content-between align-items-center border rounded p-2 mb-2">
                                            <span>{item.label}</span>
                                            <i
                                              className="fa fa-pen text-primary"
                                              style={{ cursor: "pointer", fontSize: "14px" }}
                                              onClick={() => {
                                                const updated = [...fields];
                                                updated[index].isLabelEditing = true; // EDIT AGAIN
                                                setFields(updated);
                                              }}
                                            ></i>
                                          </div>
                                        )}
                                      </div>
                                    )}


                                    {/* TEXTAREA FIELD */}
                                    {item.type === "textarea" && (
                                      <div>
                                        {item.isLabelEditing ? (
                                          /* BEFORE SAVE – enter label + tick */
                                          <div className="d-flex align-items-center mb-2">
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="Enter label"
                                              value={item.label}
                                              onChange={(e) => {
                                                const updated = [...fields];
                                                updated[index].label = e.target.value;
                                                setFields(updated);
                                              }}
                                              autoFocus
                                            />
                                            <i
                                              className="fa fa-circle-check text-success ms-2"
                                              style={{ cursor: "pointer", fontSize: "14px" }}
                                              onClick={() => {
                                                const updated = [...fields];
                                                updated[index].isLabelEditing = false; // SAVE
                                                setFields(updated);
                                              }}
                                            ></i>
                                          </div>
                                        ) : (
                                          /* AFTER SAVE – show label + edit icon */
                                          <div className="d-flex justify-content-between align-items-center border rounded p-2 mb-2">
                                            <span>{item.label}</span>
                                            <i
                                              className="fa fa-pen text-primary"
                                              style={{ cursor: "pointer", fontSize: "14px" }}
                                              onClick={() => {
                                                const updated = [...fields];
                                                updated[index].isLabelEditing = true; // EDIT AGAIN
                                                setFields(updated);
                                              }}
                                            ></i>
                                          </div>
                                        )}


                                      </div>
                                    )}



                                    {item.type === "select" && (
                                      <div>
                                        {/* LABEL EDIT */}
                                        {item.isLabelEditing ? (
                                          <div className="d-flex align-items-center mb-2">
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="Enter label"
                                              value={item.label ?? ""}
                                              onChange={(e) => {
                                                const updated = [...fields];
                                                updated[index].label = e.target.value;
                                                setFields(updated);
                                              }}
                                              autoFocus
                                            />
                                            <i
                                              className="fa fa-circle-check text-success ms-2"
                                              style={{ cursor: "pointer", fontSize: "14px" }}
                                              onClick={() => {
                                                const updated = [...fields];
                                                updated[index].isLabelEditing = false;
                                                setFields(updated);
                                              }}
                                            ></i>
                                          </div>
                                        ) : (
                                          <div className="d-flex justify-content-between align-items-center border rounded p-2 mb-2">
                                            <span>{item.label}</span>
                                            <i
                                              className="fa fa-pen text-primary"
                                              style={{ cursor: "pointer", fontSize: "14px" }}
                                              onClick={() => {
                                                const updated = [...fields];
                                                updated[index].isLabelEditing = true;
                                                setFields(updated);
                                              }}
                                            ></i>
                                          </div>
                                        )}

                                        {/* DROPDOWN with RIGHT SIDE add option icon */}
                                        <div className="d-flex align-items-center">
                                          <div className="form-control">
                                            <div className="form-check ps-0">
                                                {(item.options ?? []).length > 0 ? (
                                                  (item.options ?? []).map((opt, i) => (
                                                    <div className="d-flex justify-content-between">
                                                      <div
                                                        key={i}
                                                        style={{
                                                          display: "flex",
                                                          alignItems: "center",
                                                          marginBottom: "5px",
                                                          marginTop: "5px",
                                                        }}
                                                      >
                                                        <span style={{ flex: 1, color:"#71717a" }}>{opt}</span>
                                                      </div>
                                                      <div style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        marginBottom: "5px",
                                                        marginTop: "5px",
                                                      }}>
                                                        <i
                                                          className="fa fa-trash text-danger ms-2"
                                                          style={{ cursor: "pointer", fontSize: "14px" }}
                                                          onClick={() => {
                                                            const updated = [...fields];
                                                            updated[index].options = updated[index]?.options?.filter(
                                                              (_, j) => j !== i
                                                            );
                                                            setFields(updated);
                                                          }}
                                                        ></i>
                                                      </div>
                                                    </div>
                                                    
                                                  ))
                                                ) : (
                                                  <span className="text-muted">No options added</span>
                                                )}
                                              
                                            </div>
                                            {/* <select className="form-control">
                                            {(item.options ?? []).length > 0 ? (
                                              item.options!.map((opt, i) => <option key={i}>{opt}</option>)
                                            ) : (
                                                <option className="text-muted">No options added</option>
                                            )}
                                          </select>
                                          {(item.options ?? []).length > 0 ? <>
                                            <i
                                              className="fa fa-trash text-danger ms-2"
                                              style={{ cursor: "pointer", fontSize: "14px" }}
                                              onClick={() => {
                                                const updated = [...fields];
                                                updated[index].options = updated[index]?.options?.filter((_, i) => i !== 0); 
                                                setFields(updated);
                                              }}
                                            ></i>
                                          </> : null} */}


                                            {/* + ICON OR INPUT WITH TICK */}
                                            {item.isOptionEditing ? (
                                              <div className="d-flex align-items-center ms-2">
                                                <input
                                                  type="text"
                                                  className="form-control"
                                                  placeholder="Enter option"
                                                  value={item.newOption ?? ""}
                                                  onChange={(e) => {
                                                    const updated = [...fields];
                                                    updated[index].newOption = e.target.value;
                                                    setFields(updated);
                                                  }}
                                                  autoFocus
                                                />
                                                <i
                                                  className="fa fa-circle-check text-success ms-2"
                                                  style={{ cursor: "pointer", fontSize: "14px" }}
                                                  onClick={() => {
                                                    const updated = [...fields];
                                                    updated[index].options = [
                                                      ...(updated[index].options ?? []),
                                                      updated[index].newOption ?? ""
                                                    ];
                                                    updated[index].newOption = "";
                                                    updated[index].isOptionEditing = false;
                                                    setFields(updated);
                                                  }}
                                                ></i>

                                              </div>
                                            ) : (
                                              // <i
                                              //   className="fa fa-plus text-primary ms-2"
                                              //   style={{ cursor: "pointer", fontSize: "14px" }}
                                              //   onClick={() => {
                                              //     const updated = [...fields];
                                              //     updated[index].isOptionEditing = true;
                                              //     setFields(updated);
                                              //   }}
                                              // ></i>
                                              null
                                            )}
                                          </div>
                                          <i
                                            className="fa fa-plus text-primary ms-2"
                                            style={{ cursor: "pointer", fontSize: "14px" }}
                                            onClick={() => {
                                              const updated = [...fields];
                                              updated[index].isOptionEditing = true;
                                              setFields(updated);
                                            }}
                                          ></i>
                                        </div>
                                        
                                      </div>
                                    )}

                                    {item.type === "checkbox" && (
                                      <div>
                                        {/* LABEL EDIT */}
                                        {item.isLabelEditing ? (
                                          <div className="d-flex align-items-center">
                                            <input
                                              type="text"
                                              className="form-control mb-2"
                                              placeholder="Enter label"
                                              value={item.label ?? ""}
                                              onChange={(e) => {
                                                const updated = [...fields];
                                                updated[index].label = e.target.value;
                                                setFields(updated);
                                              }}
                                              autoFocus
                                            />
                                            <i
                                              className="fa fa-circle-check text-success ms-2"
                                              style={{ cursor: "pointer", fontSize: "14px" }}
                                              onClick={() => {
                                                const updated = [...fields];
                                                updated[index].isLabelEditing = false;
                                                setFields(updated);
                                              }}
                                            ></i>
                                            
                                          </div>
                                        ) : (
                                          <div className="d-flex justify-content-between align-items-center border rounded p-2 mb-2">
                                            <span>{item.label}</span>
                                            <i
                                              className="fa fa-pen text-primary"
                                              style={{ cursor: "pointer", fontSize: "14px" }}
                                              onClick={() => {
                                                const updated = [...fields];
                                                updated[index].isLabelEditing = true;
                                                setFields(updated);
                                              }}
                                            ></i>
                                          </div>
                                        )}

                                        {/* CHECKBOX OPTIONS WITH FLOATING LABEL STYLE */}
                                        <div className="d-flex align-items-center">
                                          <div className="form-control">
                                          {(Array.isArray(item.options) && item.options.length > 0) ? (
                                            item.options.map((opt, i) => (
                                               <div className="form-check mb-2 d-flex justify-content-between"> 
                                                <div>
                                                  <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id={`checkbox-${index}-${i}`}
                                                  />
                                                  <label
                                                    className="form-check-label"
                                                    htmlFor={`checkbox-${index}-${i}`}
                                                  >
                                                    <span style={{ color: "#71717a" }}>{opt}</span> 
                                                  </label>
                                                </div>
                                               <div>
                                                  <i
                                                    className="fa fa-trash text-danger ms-2"
                                                    style={{ cursor: "pointer", fontSize: "14px" }}
                                                    onClick={() => {
                                                      const updated = [...fields];
                                                      updated[index].options = updated[index]?.options?.filter(
                                                        (_, j) => j !== i
                                                      );
                                                      setFields(updated);
                                                    }}
                                                  ></i>
                                                 
                                               </div>
                                              
                                              </div>
                                            ))
                                          ) : (
                                            <div className="text-muted">No options added</div>
                                          )} 

                                          {/* ADD NEW OPTION */}
                                          {item.isOptionEditing ? (
                                            <div className="d-flex align-items-center ms-2">
                                              <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter option"
                                                value={item.newOption ?? ""}
                                                onChange={(e) => {
                                                  const updated = [...fields];
                                                  updated[index].newOption = e.target.value;
                                                  setFields(updated);
                                                }}
                                                autoFocus
                                              />
                                              <i
                                                className="fa fa-circle-check text-success ms-2"
                                                style={{ cursor: "pointer", fontSize: "14px" }}
                                                onClick={() => {
                                                  const updated = [...fields];
                                                  updated[index].options = [
                                                    ...(updated[index].options ?? []),
                                                    updated[index].newOption ?? ""
                                                  ];
                                                  updated[index].newOption = "";
                                                  updated[index].isOptionEditing = false;
                                                  setFields(updated);
                                                }}
                                              ></i>
                                             
                                            </div>
                                          ) : (
                                             null
                                          )}
                                          
                                        </div>
                                          <i
                                            className="fa fa-plus text-primary ms-2"
                                            style={{ cursor: "pointer", fontSize: "14px" }}
                                            onClick={() => {
                                              const updated = [...fields];
                                              updated[index].isOptionEditing = true;
                                              setFields(updated);
                                            }}
                                          ></i>
                                        </div>
                                      </div>
                                    )}





                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* flow work end */}


                          </div>
                          <div className="col-md-5 sticky-top h-100">
                            <h5 className="mt-4 ms-3">Flow Preview</h5>
                            <div className="text-end">
                              <div className="template-preview px-2">
                                <div className="conversation">
                                  <div className="conversation-container">
                                    <div className="message received z-0">

                                      {/* <div>

{fields.map((item, index) => (
  <div key={index}>
    {!item.isLabelEditing && (
      <div className="message received z-0 mb-2 p-2 border rounded" style={{ textAlign: 'left' }}>
        {item.label}
      </div>
    )}
  </div>
))}



</div> */}

                                     

                                        {fields.length > 5 ? (
                                          <div id="fieldsCarousel" className="carousel slide" data-bs-ride="false"
                                            data-bs-interval="false">
                                            <div className="carousel-inner">
                                              {Array.from({ length: Math.ceil(fields.length / 5) }).map((_, slideIndex) => (
                                                <div
                                                  className={`carousel-item ${slideIndex === 0 ? "active" : ""}`}
                                                  // className="carousel-item active"
                                                  key={slideIndex}
                                                >
                                                  <div className="d-flex flex-wrap justify-content-center">
                                                    {fields
                                                      .slice(slideIndex * 5, slideIndex * 5 + 5)
                                                      .map((item, index) => (
                                                        <div key={`${slideIndex}-${index}`} style={{ minWidth: "250px" }}>
                                                          {!item.isLabelEditing && (
                                                            <div
                                                              style={{
                                                                textAlign: "left",
                                                                height:
                                                                  Array.isArray(item.options) &&
                                                                    item.options.length > 0 &&
                                                                    item.isOpen
                                                                    ? "90px"
                                                                    : "auto",
                                                              }}
                                                            >
                                                              <div key={index}>
                                                                {!item.isLabelEditing && (
                                                                  <div
                                                                    // className="message received z-0 mb-2 p-2"
                                                                    style={{ textAlign: "left", height: Array.isArray(item.options) && item.options.length > 0 && item.isOpen ? "90px" : "auto" }}
                                                                  >
                                                                    {/* TEXT FIELD */}
                                                                    {item.type === "text" && (
                                                                      <div className="vendor-create-container mt-3">
                                                                        <input
                                                                          type="text"
                                                                          id={`text-${index}`}
                                                                          className="vendor-crt-input p-2 me-1 border rounded"
                                                                          placeholder=" "
                                                                          required
                                                                        />
                                                                        <label htmlFor={`text-${index}`} className="vendor-crt-label">
                                                                          {item.label}
                                                                        </label>
                                                                      </div>
                                                                    )}

                                                                    {/* TEXTAREA FIELD */}
                                                                    {item.type === "textarea" && (
                                                                      <div className="vendor-create-container mt-3">
                                                                        <textarea
                                                                          id={`textarea-${index}`}
                                                                          className="vendor-crt-input p-2 me-1 border rounded"
                                                                          placeholder=" "
                                                                          required
                                                                        ></textarea>
                                                                        <label htmlFor={`textarea-${index}`} className="vendor-crt-label">
                                                                          {item.label}
                                                                        </label>
                                                                      </div>
                                                                    )}

                                                                    {/* SELECT FIELD */}
                                                                    {item.type === "select" && (
                                                                      <div
                                                                        className="vendor-create-container mt-2 lk-dropdown"
                                                                        data-control="select-dropdown"
                                                                      >
                                                                        <label
                                                                          className="lk-dropdown-label"
                                                                          onClick={() =>
                                                                            setFields((prev) => {
                                                                              const updated = [...prev];
                                                                              updated[index].isOpen = !updated[index].isOpen;
                                                                              return updated;
                                                                            })
                                                                          }
                                                                        >
                                                                          {item.label}
                                                                          <i className="fa fa-chevron-down" style={{ float: "right" }}></i>
                                                                        </label>

                                                                        {Array.isArray(item.options) && item.options.length > 0 ? (
                                                                          <div className={`lk-dropdown-list ${item.isOpen ? "show" : ""}`}>
                                                                            {item.options.map((opt, optIndex) => (
                                                                              <label
                                                                                className="lk-dropdown-option"
                                                                                key={optIndex}
                                                                                onClick={() => {
                                                                                  const updated = [...fields];

                                                                                  // Change label to selected option
                                                                                  // updated[index].label = opt;  

                                                                                  // Close dropdown
                                                                                  updated[index].isOpen = false;

                                                                                  setFields(updated);
                                                                                }}
                                                                              >
                                                                                <span className="label-flows-span">
                                                                                  {opt}
                                                                                </span>
                                                                              </label>
                                                                            ))}
                                                                          </div>
                                                                        ) : null}
                                                                      </div>
                                                                    )}




                                                                    {/* CHECKBOX FIELD */}
                                                                    {item.type === "checkbox" && (
                                                                      <div className="vendor-create-container mt-2 lk-dropdown" data-control="checkbox-dropdown">

                                                                        <label className="lk-dropdown-label" onClick={() => setFields(prev => {
                                                                          const updated = [...prev];
                                                                          updated[index].isOpen = !updated[index].isOpen;
                                                                          return updated;
                                                                        })}>
                                                                          {item.label}
                                                                          <i className="fa fa-chevron-down" style={{ float: "right" }}></i>
                                                                        </label>
                                                                        {Array.isArray(item.options) && item.options.length > 0 ? <> <div className={`lk-dropdown-list ${item.isOpen ? "show" : ""}`}>
                                                                          {Array.isArray(item.options) &&
                                                                            item.options.length > 0 &&
                                                                            item.options.map((opt, optIndex) => (
                                                                              <label className="lk-dropdown-option" key={optIndex}>
                                                                                <input
                                                                                  type="checkbox"
                                                                                  checked={item.selectedOptions?.includes(opt) || false}
                                                                                  onChange={() => {
                                                                                    const updated = [...fields];

                                                                                    if (!Array.isArray(updated[index].selectedOptions)) {
                                                                                      updated[index].selectedOptions = [];
                                                                                    }

                                                                                    const isSelected = updated[index].selectedOptions.includes(opt);

                                                                                    if (isSelected) {
                                                                                      updated[index].selectedOptions = updated[index].selectedOptions.filter(o => o !== opt);
                                                                                    } else {
                                                                                      updated[index].selectedOptions = [...updated[index].selectedOptions, opt];
                                                                                    }

                                                                                    setFields(updated);
                                                                                  }}
                                                                                />
                                                                                <span className="label-flows-span">
                                                                                  {opt}
                                                                                </span>
                                                                              </label>
                                                                            ))}
                                                                        </div></> : null}

                                                                      </div>
                                                                    )}


                                                                  </div>
                                                                )}
                                                              </div>                                                            </div>
                                                          )}
                                                        </div>
                                                      ))}
                                                  </div>
                                                </div>
                                              ))}
                                            </div>

                                            {/* Carousel controls */}
                                            <button
                                              className="carousel-control-prev "
                                              type="button"
                                              data-bs-target="#fieldsCarousel"
                                              data-bs-slide="prev"
                                            >
                                              <span className="carousel-control-prev-icon bg-dark rounded" aria-hidden="true"></span>
                                              <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button
                                              className="carousel-control-next "
                                              type="button"
                                              data-bs-target="#fieldsCarousel"
                                              data-bs-slide="next"
                                            >
                                              <span className="carousel-control-next-icon bg-dark rounded" aria-hidden="true"></span>
                                              <span className="visually-hidden">Next</span>
                                            </button>
                                          </div>
                                        ) : (
                                          <div className="fields-container">
                                            {fields.map((item, index) => (
                                              <div key={index}>
                                                {!item.isLabelEditing && (
                                                  <div
                                                    style={{
                                                      textAlign: "left",
                                                      height:
                                                        Array.isArray(item.options) &&
                                                          item.options.length > 0 &&
                                                          item.isOpen
                                                          ? "90px"
                                                          : "auto",
                                                    }}
                                                  >
                                                    <div key={index}>
                                                      {!item.isLabelEditing && (
                                                        <div
                                                          // className="message received z-0 mb-2 p-2"
                                                          style={{ textAlign: "left", height: Array.isArray(item.options) && item.options.length > 0 && item.isOpen ? "90px" : "auto" }}
                                                        >
                                                          {/* TEXT FIELD */}
                                                          {item.type === "text" && (
                                                            <div className="vendor-create-container mt-3">
                                                              <input
                                                                type="text"
                                                                id={`text-${index}`}
                                                                className="vendor-crt-input p-2 me-1 border rounded"
                                                                placeholder=" "
                                                                required
                                                              />
                                                              <label htmlFor={`text-${index}`} className="vendor-crt-label">
                                                                {item.label}
                                                              </label>
                                                            </div>
                                                          )}

                                                          {/* TEXTAREA FIELD */}
                                                          {item.type === "textarea" && (
                                                            <div className="vendor-create-container mt-3">
                                                              <textarea
                                                                id={`textarea-${index}`}
                                                                className="vendor-crt-input p-2 me-1 border rounded"
                                                                placeholder=" "
                                                                required
                                                              ></textarea>
                                                              <label htmlFor={`textarea-${index}`} className="vendor-crt-label">
                                                                {item.label}
                                                              </label>
                                                            </div>
                                                          )}

                                                          {/* SELECT FIELD */}
                                                          {item.type === "select" && (
                                                            <div
                                                              className="vendor-create-container mt-2 lk-dropdown"
                                                              data-control="select-dropdown"
                                                            >
                                                              <label
                                                                className="lk-dropdown-label"
                                                                onClick={() =>
                                                                  setFields((prev) => {
                                                                    const updated = [...prev];
                                                                    updated[index].isOpen = !updated[index].isOpen;
                                                                    return updated;
                                                                  })
                                                                }
                                                              >
                                                                {item.label}
                                                                <i className="fa fa-chevron-down" style={{ float: "right" }}></i>
                                                              </label>

                                                              {Array.isArray(item.options) && item.options.length > 0 ? (
                                                                <div className={`lk-dropdown-list ${item.isOpen ? "show" : ""}`}>
                                                                  {item.options.map((opt, optIndex) => (
                                                                    <label
                                                                      className="lk-dropdown-option"
                                                                      key={optIndex}
                                                                      onClick={() => {
                                                                        const updated = [...fields];

                                                                        // Change label to selected option
                                                                        // updated[index].label = opt;  

                                                                        // Close dropdown
                                                                        updated[index].isOpen = false;

                                                                        setFields(updated);
                                                                      }}
                                                                    >
                                                                      <span className="label-flows-span">
                                                                        {opt}
                                                                      </span>
                                                                    </label>
                                                                  ))}
                                                                </div>
                                                              ) : null}
                                                            </div>
                                                          )}




                                                          {/* CHECKBOX FIELD */}
                                                          {item.type === "checkbox" && (
                                                            <div className="vendor-create-container mt-2 lk-dropdown" data-control="checkbox-dropdown">

                                                              <label className="lk-dropdown-label" onClick={() => setFields(prev => {
                                                                const updated = [...prev];
                                                                updated[index].isOpen = !updated[index].isOpen;
                                                                return updated;
                                                              })}>
                                                                {item.label}
                                                                <i className="fa fa-chevron-down" style={{ float: "right" }}></i>
                                                              </label>
                                                              {Array.isArray(item.options) && item.options.length > 0 ? <> <div className={`lk-dropdown-list ${item.isOpen ? "show" : ""}`}>
                                                                {Array.isArray(item.options) &&
                                                                  item.options.length > 0 &&
                                                                  item.options.map((opt, optIndex) => (
                                                                    <label className="lk-dropdown-option" key={optIndex}>
                                                                      <input
                                                                        type="checkbox"
                                                                        checked={item.selectedOptions?.includes(opt) || false}
                                                                        onChange={() => {
                                                                          const updated = [...fields];

                                                                          if (!Array.isArray(updated[index].selectedOptions)) {
                                                                            updated[index].selectedOptions = [];
                                                                          }

                                                                          const isSelected = updated[index].selectedOptions.includes(opt);

                                                                          if (isSelected) {
                                                                            updated[index].selectedOptions = updated[index].selectedOptions.filter(o => o !== opt);
                                                                          } else {
                                                                            updated[index].selectedOptions = [...updated[index].selectedOptions, opt];
                                                                          }

                                                                          setFields(updated);
                                                                        }}
                                                                      />
                                                                      <span className="label-flows-span">
                                                                        {opt}
                                                                      </span>
                                                                    </label>
                                                                  ))}
                                                              </div></> : null}

                                                            </div>
                                                          )}


                                                        </div>
                                                      )}
                                                    </div>                                                  </div>
                                                )}
                                              </div>
                                            ))}
                                          </div>
                                        )}





                                      {true && (
                                        <div className="main-container-carousel">
                                          <div className="carousel-container">
                                            <div className="wrapper conversation-container">
                                              <div className="slider-wrapper">
                                                <div
                                                  className="inner"
                                                  style={{ width: `${slides.length * 100}%`, transform: `translateX(-${currentIndex * (100 / slides.length)}%)` }}
                                                >
                                                  {slides.map((slide: any, index: any) => (
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
                                                  <button onClick={(e) => { prevSlide(); e.preventDefault() }}>❮</button>
                                                  <button onClick={(e) => { nextSlide(); e.preventDefault() }}>❯</button>
                                                </div>)}
                                              <div className="slider-dot-control">
                                                {slides.map((_: any, index: any) => (
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
                                                <hr style={{ background: "#c9c9c9" }} />
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