import React, { useEffect, useRef, useState } from "react";
import Userimg from "../../../../assets/img/team-2.jpg";
import Userimg1 from "../../../../assets/img/small-logos/logo-spotify.svg";
import { Navigate, useNavigate } from "react-router-dom";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import TopNav from "../../../../shared/TopNav";
import { CKEditor } from 'ckeditor4-react';
import "./whatsapp-create-template.css";
import { toast } from "react-toastify";
import { text } from "stream/consumers";
import VendorAPI from "../../../../api/services/vendorLogin/vendorApi";
import API from "../../../../api/api";
import API_EP_BOOK from "../../../../api/endpoints";
import { FadeLoader } from "react-spinners";
import Footer from "../../../../shared/Footer";

interface LangCodeDrop {
    id: string;
    language_name: string;
    language_code: string;
}
function WhatsappCreateTemplate() {

    type FormValue = {
        name: string;
        value: string;
    };
    const [redirect, setRedirect] = React.useState<string | null>(null);
    const [langCodeDrop, setlangCodeDrop] = useState<LangCodeDrop[]>([]);
    const navigate = useNavigate();
    const [headerType, setHeaderType] = useState('None')
    const [BodyType, setBodyType] = useState('None')
    const [footerType, setFooterType] = useState('None')
    const [file, setFile] = useState<File | null>(null);
    const [imgValue, setImgValue] = useState("")
    const [imgid, setImgid] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const [setValue, setSetValue] = useState("")

    useEffect(() => {
        const queryParams = window.location.pathname;
        const myArray = queryParams.split("/");
        setSetValue(myArray[2]);
    })

    const [selectedValue, setSelectedValue] = useState('None');
    const [bodyselectedValue, setBodySelectedValue] = useState('');
    const [fileName, setFileName] = useState<string | null>(null);
    const [textInput, setTextInput] = useState('');
    const [BodytextInput, setBodyTextInput] = useState<string>("");
    const [bodychildtextInput, setbodychildTextInput] = useState([]);
    const [footertextInput, setFooterTextInput] = useState('');
    const [isAddDisabled, setIsAddDisabled] = useState(false);
    const [showIndex, setShowIndex] = useState(0);
    const [editorInstance, setEditorInstance] = useState<any>(null);

    // Templatate Create Usestates

    const [names, setNames] = useState('')
    const [whatsappId, setWhatsappId] = useState('')
    const [category, setCategory] = useState('')
    const [languageCode, setLaguageCode] = useState('')
    const [langName, setLangName] = useState('')
    const [getId, setGetId] = useState('')
    const [bodyTextValues, setBodyTextValues] = useState('')
    const [textValues, setTextValues] = useState('')


    useEffect(() => {
        const queryParams = window.location.pathname;
        const myArray = queryParams.split("/");
        setGetId(myArray[3])
    }, [])
    useEffect(() => {
        if (getId && getId !== "undefined" && getId !== "") {
            whatsappGetApi(getId);
        }
    }, [getId]);

    const [buttonQuicktxt, setButtonQuicktxt] = useState('');
    const [buttonPhonetxt, setButtonPhonetxt] = useState('');
    const [buttonPhoneNotxt, setButtonPhoneNotxt] = useState('91');
    const [buttonCopycodetxt, setButtonCopycodetxt] = useState('');
    const [buttonurltxt, setButtonurltxt] = useState('');
    const [buttonwebUrltxt, setButtonwebUrltxt] = useState('');
    const [buttondynamicwebUrltxt, setButtondynamicwebUrltxt] = useState('');
    const [buttonexampleUrltxt, setButtonexampleUrltxt] = useState('');
    const [buttondynamicUrltxt, setButtondynamicUrltxt] = useState('');
    const [buttonQuickOpt, setButtonQuickopt] = useState(false);
    const [buttonPhoneOpt, setButtonPhoneopt] = useState(false);
    const [buttoncopyOpt, setButtoncopyopt] = useState(false);
    const [buttonurlOpt, setButtonurlopt] = useState(false);
    const [buttondynamicurlOpt, setButtondynamicurlopt] = useState(false);
    const [quickbtn, setquickbtn] = useState('None')
    const [phoenobtn, setphoenobtn] = useState('None')
    const [copybtn, setcopybtn] = useState('None')
    const [urlbtn, seturlbtn] = useState('None')
    const [dynamicurlbtn, setdynamicurlbtn] = useState('None')
    const [buttonActive, setbuttonActive] = useState(false);
    const [editorReady, setEditorReady] = useState(false);

    useEffect(() => {
      setEditorReady(true);
    }, []);
    const handleQuickButtonOpt = () => {
        setButtonQuickopt(true)
        setbuttonActive(true)
        setquickbtn("QUICK_REPLY")
    }
    const handlePhoneButtonOpt = () => {
        setButtonPhoneopt(true)
        setbuttonActive(true)
        setphoenobtn("PHONE_NUMBER")
    }
    const handleCopycodeButtonOpt = () => {
        setButtoncopyopt(true)
        setbuttonActive(true)
        setcopybtn("COPY_CODE")
    }
    const handleurlButtonOpt = () => {
        setButtonurlopt(true)
        setbuttonActive(true)
        seturlbtn("URL")
    }
    const handleDynamicurlButtonOpt = () => {
        setButtondynamicurlopt(true)
        setbuttonActive(true)
        setdynamicurlbtn("URL")
    }

    const [loading, setLoading] = useState(false)
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

        if (type === 'text') {
            setTextInput('');
        }
        if (type === 'None') {
            setTextInput('');
            setHeaderTextInput('')
            setFormValue(null)
            setIsAddDisabled(false)
        }
    };
    useEffect(() => {
        setBodyTextInput(BodytextInput);
    }, [BodytextInput, BodyType]);

    const handleBoxClick = () => {
        const fileInput = document.getElementById('file-input') as HTMLInputElement | null;
        if (fileInput) {
            let acceptedTypes = '';
            switch (selectedValue) {
                case 'image':
                    acceptedTypes = 'image/*';
                    break;
                case 'video':
                    acceptedTypes = 'video/*';
                    break;
                case 'document':
                    acceptedTypes = '.pdf, .doc, .docx, .txt';
                    break;
                default:
                    acceptedTypes = '*/*';
            }

            fileInput.accept = acceptedTypes;
            setFileName('');
            fileInput.click();
        }
    };

    const handleTextInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setTextInput(event.target.value);
    };

    const [formValue, setFormValue] = useState<FormValue | null>(null);
    const [headerTextInput, setHeaderTextInput] = useState<string>('');
    const [bodyformValues, setBodyFormValues] = useState<{ name: string; value: string }[]>([]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (formValue) {  // Check if formValue is not null
            setFormValue({
                ...formValue,  // Spread the current formValue
                name: e.target.value,  // Update the name field
            });
        }
    };

    const handleHeaderTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedHeaderText = e.target.value;
        if (updatedHeaderText === "") {
            setFormValue(null)
            setIsAddDisabled(false)

        }
        setHeaderTextInput(updatedHeaderText);
        setTextInput(updatedHeaderText)

    };
    const add = (e: React.FormEvent) => {
        e.preventDefault();
        setFormValue({ name: '', value: '1' });
        if (!formValue?.value) {
            setHeaderTextInput((prev) => prev + `{{${formValue?.value || 1}}}`)
            setTextInput((prev) => prev + `{{${formValue?.value || 1}}}`)
        };
        setIsAddDisabled(true)
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

    const handleBodyChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const userTypedText = e.target.value;
        const fixedPart = `{{${index + 1}}}`;
        setBodyFormValues((prevFormValues) =>
            prevFormValues.map((item, i) =>
                i === index ? { ...item, value: `${fixedPart}`, name: userTypedText } : item
            )
        );
    };

    const handleFooterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFooterTextInput(e.target.value);
    };
    const editorInstanceRef = useRef<any>(null);
    useEffect(() => {
        if (editorInstanceRef.current && BodytextInput !== undefined) {
            editorInstanceRef.current.setData(BodytextInput)
        }
    }, [BodytextInput])
    const handleEditorChange = (event: any) => {
        if (!event.editor) return;
        const editorData = event.editor.getData();
        setBodyTextInput(editorData);
        if (event?.editor) {
            let htmlText = event.editor.getData()
                .replace(/&nbsp;/g, ' ')
                .replace(/<br\s*\/?>/g, '');
            let formattedText = htmlText
                .replace(/<strong>(.*?)<\/strong>/g, '*$1*')
                .replace(/<em>(.*?)<\/em>/g, '_$1_')
                .replace(/<strike>(.*?)<\/strike>/g, '~$1~')
                .replace(/<s>(.*?)<\/s>/g, '~$1~');
            let cleanText = formattedText.replace(/<(?!\/?(b|i|s)\b)[^>]+>/g, '');
            setBodyTextInput(cleanText);

            const variablePattern = /{{\d+}}/g;
            const foundVariables = cleanText.match(variablePattern) || [];

            setBodyFormValues((prevFormValues) => {
                let updatedFormValues = foundVariables.map((variable: any) => {
                    let existingItem = prevFormValues.find((item) => item.value.startsWith(variable));

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
          if (!names&&!langName&&!category) {
            return;
        }
        //   setLoading(true)
        setIsLoading(true);
        let apiData = {
            ...(setValue === "edit-whatsapp-template" && { template_id: whatsappId }),
            name: names.toLowerCase(),
            category: category,
            ...(imgid && { mediaId: imgid }),            language: languageCode,
            components: [
                // HEADER component
                (headerType === "text" ? {
                    ...(headerType && textInput ? {
                        type: 'HEADER',
                        format: headerType.toUpperCase(),
                        text: textInput,
                        ...(formValue?.name?.trim() && {
                            example: {
                                header_text: [formValue?.name.trim()]
                            }
                        })
                    } : null),
                } :
                    (headerType === "image" || headerType === "video" || headerType === "document" ? {
                        type: 'HEADER',
                        format: headerType,
                        example: {
                            header_handle: [imgValue]
                        }
                    } : null)
                ),
                // BODY component
                {
                    type: 'BODY',
                    text: BodytextInput,
                    ...(bodyformValues.length > 0 && {
                        example: {
                            body_text: [bodyformValues.map(param => param.name.trim())]
                        }
                    })
                },

                // FOOTER component
                (footertextInput ? {
                    type: 'FOOTER',
                    text: footertextInput
                } : null),
                // BUTTON component
                (buttonActive ? {
                    type: 'BUTTONS',
                    buttons: [
                        buttonQuicktxt && {
                            type: quickbtn,
                            text: buttonQuicktxt
                        },
                        buttonPhonetxt && buttonPhoneNotxt && {
                            type: phoenobtn,
                            text: buttonPhonetxt,
                            phone_number: buttonPhoneNotxt
                        },
                        buttonCopycodetxt && {
                            type: copybtn,
                            example: buttonCopycodetxt
                        },
                        buttonurltxt && {
                            type: urlbtn,
                            text: buttonurltxt,
                            url: buttonwebUrltxt
                        },
                        buttondynamicUrltxt && {
                            type: dynamicurlbtn,
                            text: buttondynamicUrltxt,
                            url: buttondynamicwebUrltxt,
                            example: [
                                buttonexampleUrltxt
                            ]
                        }

                    ].filter(Boolean)
                } : null)
            ].filter(component => component !== null && Object.keys(component).length > 0)
        }
        VendorAPI.whatsappTemplateCreate(apiData).then((responseData: any) => {
            if (responseData.apiStatus.code === '200') {
                toast.success(responseData.apiStatus.message);
                setIsLoading(false);
                setSubmit(false);
                navigate("/vendor/whatsapp-template")
            } else {
                setIsLoading(false);
                // setSubmit(false);
                toast.error(responseData.responseData?.error?.message || responseData?.apiStatus?.message);
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
            if (responseData.apiStatus.code === '200') {
                const data = responseData?.responseData;
                setNames(data?.name);
                setLaguageCode(data?.language);
                setLangName(data?.language);
                setCategory(data?.category);
                
                const componentFormat = data?.components?.[0]?.format?.toLowerCase();
                if (componentFormat) {
                    setSelectedValue(componentFormat);
                    setHeaderType(componentFormat);
                    setLoading(false)
                }
                const bodyText = data?.components?.[1]?.text;
                if (bodyText) {
                    setBodyTextValues(bodyText);
                    setLoading(false)
                }
                data?.components?.forEach((component: any) => {
                    switch (component.type) {
                        case "HEADER":
                            setTextInput(component?.text);
                            setHeaderTextInput(component?.text);
                            setLoading(false)
                            if (component?.example?.header_text?.[0] || component?.example?.header_handle?.[0]) {
                                setIsAddDisabled(true);
                                setImgValue(component?.example?.header_handle?.[0])
                                setFormValue((prev) => ({
                                    name: component?.example?.header_text?.[0],
                                    value: "1",
                                }));
                            }
                            break;
                        case "BODY":
                            let output = component.text;
                            output = output.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
                            output = output.replace(/_(.*?)_/g, '<em>$1</em>');
                            setBodyTextInput(output);

                            setLoading(false)
                            if (component?.text && component?.example?.body_text[0]) {
                                setbodychildTextInput(component?.example?.body_text[0]);
                                const newValues = component?.example?.body_text[0]?.map((item: string, index: number) => ({
                                    value: `{{${index + 1}}}`,  // Dynamic name based on index
                                    name: item  // Item value from bodyText
                                }));
                                setBodyFormValues([...newValues])
                                setLoading(false)
                                if (editorInstance) {
                                    editorInstance.setData(component?.text);
                                }
                            }
                            else if (component?.text) {
                                setbodychildTextInput(component?.text)
                                setLoading(false)
                            }
                            break;
                        case "FOOTER":
                            setLoading(false)
                            setFooterTextInput(component?.text);
                            break;
                        case "BUTTONS":
                            setLoading(false)
                            component?.buttons.forEach((buttonsValue: any) => {
                                if (buttonsValue) {
                                    switch (buttonsValue?.type) {
                                        case "QUICK_REPLY":
                                            setButtonQuickopt(true);
                                            setbuttonActive(true);
                                            setquickbtn("QUICK_REPLY");
                                            setButtonQuicktxt(buttonsValue?.text);
                                            break;
                                        case "PHONE_NUMBER":
                                            setButtonPhoneopt(true);
                                            setbuttonActive(true);
                                            setphoenobtn("PHONE_NUMBER");
                                            setButtonPhonetxt(buttonsValue?.text);
                                            setButtonPhoneNotxt(buttonsValue?.phone_number);
                                            break;
                                        case "COPY_CODE":
                                            setButtoncopyopt(true);
                                            setbuttonActive(true);
                                            setcopybtn("COPY_CODE");
                                            setButtonCopycodetxt(buttonsValue?.text);
                                            break;
                                        case "URL":
                                            if (buttonsValue?.text && buttonsValue?.text?.url) {
                                                setButtonurlopt(true);
                                                setbuttonActive(true);
                                                seturlbtn("URL");
                                                setButtonurltxt(buttonsValue?.text);
                                                setButtonwebUrltxt(buttonsValue?.url);
                                            }
                                            else {
                                                setButtondynamicurlopt(true);
                                                setbuttonActive(true);
                                                setdynamicurlbtn("URL");
                                                setButtondynamicUrltxt(buttonsValue?.text);
                                                setButtondynamicwebUrltxt(buttonsValue?.url);
                                                setButtonexampleUrltxt(buttonsValue?.example?.[0]);
                                            }
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            });
                            break;
                        default:
                            break;

                    }
                });

            } else {
                setLoading(false)
                // Handle API error (optional)
                // toast.error(`get failed: ${responseData.apiStatus.message}`);
            }
        } catch (error) {
            console.error("Error during API call:", error);
            setLoading(false)
        }
    };
    
    const languageCodeDropdwon = () => {
        VendorAPI.languageCodeDropdown()
            .then((responceData: any) => {
                if (responceData.apiStatus.code === '200') {
                    setlangCodeDrop(responceData?.responseData)
                }
            })
            .catch((error: any) => {
                console.error("Error during login:", error);
            });
    };
    //Dropdown Filter
    const filteredLangCodeDrop = langCodeDrop.filter((dropdownValue) =>
        (dropdownValue?.language_name || '').toLowerCase().includes((langName || '').toLowerCase())
      );
    const [imageUrl,setImageUrl]=useState("");
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];

        if (selectedFile) {
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(selectedFile.type)) {
                toast.error("Only JPG, JPEG, and PNG files are allowed.");
                return;
            }
            if (file && selectedFile.name === file.name && selectedFile.size === file.size && selectedFile.lastModified === file.lastModified) {
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
            if (response?.apiStatus?.code==="200") {
                setImgValue(response?.responseData?.h)
                setImgid(response?.responseData?.id)
                toast.success(response?.apiStatus?.message);
            } else {
                toast.error(response.apiStatus?.message);
            }
        } catch (error) {
            console.error("Import Error:", error);
            toast.error("An error occurred while importing the file.");
        }
    };
    useEffect(() => {
        languageCodeDropdwon()
    }, []);
    
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
                            <h4><i className="fa-brands fa-whatsapp"></i> {setValue === 'create-whatsapp-template' ? 'Create' + ' New Template' : 'Edit' + ' Template'}</h4>
                            <h3></h3>
                        </div>
                        <div className="col-md-8 text-end whatsapp-three-btn">

                            {setValue == 'create-whatsapp-template' ? <><button
                                className="vendor-crt-btn"
                                onClick={() => navigate("/vendor/whatsapp-template")}
                            >
                                <i className="fa-solid fa-chevron-left"></i> Back to Templates
                            </button><button className="vendor-crt-btn" onClick={() => navigate("")}>
                                    Help{" "}
                                </button></> : ''}
                            {/* Edit Condition */}
                            {setValue === 'edit-whatsapp-template' ? (
                                <>
                                    <button className="vendor-crt-btn" onClick={() => navigate("/vendor/whatsapp-template")}>
                                        <i className="fa-solid fa-chevron-left"></i> Back to Templates
                                    </button>
                                    <button className="vendor-crt-btn" onClick={() => navigate("")}>
                                        Edit this Template on Meta <i className="fas fa-external-link-alt"></i>
                                    </button>
                                    <button className="vendor-crt-btn" onClick={() => navigate("")}>
                                        Help
                                    </button>
                                </>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
                {
                    loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: "100px" }}>
                            <FadeLoader color="#36d7b7" />
                        </div>
                    ) : (
                        <>
                            <div className="vendor-maincontent container-fluid py-4">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card mb-4">
                                            <div className="card-body px-0 pt-0 pb-2">
                                                <form action="">
                                                    <div className="row">
                                                        <div className="col-md-7 login-input-group" style={{ padding: "25px" }}>
                                                            <div className="vendor-create-container">
                                                                <input
                                                                    type="text"
                                                                    id="vendor-crt-input"
                                                                    className="vendor-crt-input"
                                                                    placeholder=" "
                                                                    required
                                                                    style={submit && names.length == 0 ? { borderColor: "red" } : { borderColor: "" }}
                                                                    value={names}
                                                                    autoComplete="off" onChange={(e) => setNames(e.target.value)}
                                                                />
                                                                <label
                                                                    htmlFor="vendor-crt-input"
                                                                    className="vendor-crt-label"
                                                                >
                                                                    <i className="fa-solid fa-user"></i>
                                                                    {" "}

                                                                    Template Name
                                                                </label>
                                                            </div>
                                                            {submit && names.length == 0 ? (
                                                                <div className="text-danger error-message-required">Template name is required </div>
                                                            ) : (
                                                                <></>
                                                            )}
                                                            <div className="vendor-create-container login-input-group">
                                                                <div className="edit-container dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <input
                                                                        type="text"
                                                                        id="vendor-crt-input"
                                                                        className="vendor-crt-input"
                                                                        placeholder=" "
                                                                        required
                                                                        style={submit && langName.length == 0 ? { borderColor: "red" } : { borderColor: "" }}
                                                                        value={langName}
                                                                        // onClick={languageCodeDropdwon}
                                                                        autoComplete="off" onChange={(e) => setLangName(e.target.value)}
                                                                    />
                                                                    <label htmlFor="vendor-crt-input" className="vendor-crt-label">
                                                                        <i className="fa-solid fa-language"></i> Template Language Code
                                                                    </label>
                                                                    <i className="dropdown-icon font-size-dash-arrow fa-solid fa-chevron-down"></i>
                                                                    <ul className="dropdown-menu template-dropdown w-100" >
                                                                    {filteredLangCodeDrop.length === 0 ? (
                                                                        <li className="dropdown-nodata-found">No data found</li>
                                                                    ) : (
                                                                        filteredLangCodeDrop.map((dropdownValue, id) => (
                                                                            <li key={id}>
                                                                                <a
                                                                                    className="dropdown-item"
                                                                                    href="#"
                                                                                    onClick={() => {
                                                                                        setLaguageCode(dropdownValue?.language_code);
                                                                                        setLangName(dropdownValue?.language_name);
                                                                                    }}
                                                                                >
                                                                                    {dropdownValue?.language_name}
                                                                                </a>
                                                                            </li>
                                                                        )))}
                                                                    </ul>
                                                                </div>
                                                                {submit && langName.length == 0 ? (
                                                                <div className="text-danger error-message-required">Language name is required </div>
                                                            ) : (
                                                                <></>
                                                            )}
                                                            </div>

                                                            <div className="vendor-create-container login-input-group">
                                                                <div
                                                                    className="vendor-create-container dropdown"
                                                                    data-bs-toggle="dropdown"
                                                                    aria-expanded="false"
                                                                >
                                                                    <input
                                                                        type="text"
                                                                        id="vendor-crt-input"
                                                                        className="vendor-crt-input"
                                                                        placeholder=" "
                                                                        required
                                                                        style={submit && category.length == 0 ? { borderColor: "red" } : { borderColor: "" }}
                                                                        readOnly
                                                                        value={category}
                                                                    />
                                                                    <label
                                                                        htmlFor="vendor-crt-input"
                                                                        className="vendor-crt-label"

                                                                    >
                                                                        <i className="fa-solid fa-list"></i>
                                                                        {" "}

                                                                        Category
                                                                    </label>
                                                                    <i
                                                                        className={"dropdown-icon font-size-dash-arrow fa-solid fa-chevron-down"}
                                                                    ></i>
                                                                    <ul className="dropdown-menu dropdown-values">
                                                                        <li>
                                                                            <a
                                                                                className="dropdown-item"
                                                                                href="#"
                                                                                onClick={() => handleCategorySelect("MARKETING")}
                                                                            >
                                                                                MARKETING
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a
                                                                                className="dropdown-item"
                                                                                href="#"
                                                                                onClick={() => handleCategorySelect("UTILITY")}
                                                                            >
                                                                                UTILITY
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                {submit && category.length == 0 ? (
                                                                <div className="text-danger error-message-required">Category is required </div>
                                                            ) : (
                                                                <></>
                                                            )}
                                                            </div>
                                                            <div className="vendor-create-container login-input-group">
                                                                <div className="vendor-create-container dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <input type="text" value={selectedValue} readOnly id="vendor-crt-input" className="vendor-crt-input" placeholder=" " required />
                                                                    <label htmlFor="vendor-crt-input" className="vendor-crt-label" >
                                                                        <i className="fa-brands fa-font-awesome"></i>
                                                                        {" "}
                                                                        Header Type
                                                                    </label>
                                                                    <i
                                                                        className={"dropdown-icon font-size-dash-arrow fa-solid fa-chevron-down"}
                                                                    ></i>
                                                                    <ul className="dropdown-menu dropdown-values">

                                                                        <li>
                                                                            <a className={`dropdown-item ${selectedValue === 'None' ? 'active' : ''}`} href="#" onClick={() => handleDropdownClick('None')}>
                                                                                None
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="dropdown-item hederline-text" href="">Text</a>
                                                                            <a className="dropdown-item headertype-values" href="#" onClick={() => handleDropdownClick('text')}>
                                                                                Text
                                                                            </a>
                                                                        </li>

                                                                        <a className="dropdown-item hederline-text" href="">Media</a>

                                                                        <li>
                                                                            <a className="dropdown-item" href="#" onClick={() => handleDropdownClick('image')}>
                                                                                Image
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="dropdown-item" href="#" onClick={() => handleDropdownClick('video')}>
                                                                                Video
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="dropdown-item" href="#" onClick={() => handleDropdownClick('document')}>
                                                                                Document
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="dropdown-item" href="#" onClick={() => handleDropdownClick('location')}>
                                                                                Location
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </div>

                                                                {selectedValue === 'text' && (
                                                                    <>

                                                                        <div >
                                                                            <div className="duplicate-values">
                                                                                {/* Input for name field */}
                                                                                <input
                                                                                    type="text"
                                                                                    value={headerTextInput} // Bind to name
                                                                                    onChange={handleHeaderTextChange}
                                                                                    placeholder="Enter name"
                                                                                    style={{ width: '100%' }}
                                                                                    className="selected-value-box"
                                                                                />
                                                                            </div>

                                                                            <button
                                                                                onClick={add}
                                                                                className="add-variables mt-2 mb-2"
                                                                                disabled={isAddDisabled}
                                                                                style={{
                                                                                    cursor: isAddDisabled ? 'not-allowed' : 'pointer',
                                                                                    opacity: isAddDisabled ? 0.5 : 1,
                                                                                    pointerEvents: isAddDisabled ? 'none' : 'auto',
                                                                                }}
                                                                            >
                                                                                + Add variable
                                                                            </button>

                                                                        </div>

                                                                    </>
                                                                )}
                                                                {formValue &&
                                                                    (<>
                                                                        {selectedValue === 'text' && (
                                                                            <div className="input-container d-flex"><span className="fixed-part">{`{{${formValue.value}}}`}</span>
                                                                                <input
                                                                                    type="text"
                                                                                    value={formValue.name}
                                                                                    onChange={handleNameChange}
                                                                                    placeholder=""
                                                                                    style={{ width: '100%' }}
                                                                                    className="editable-input"
                                                                                /></div>
                                                                        )}</>)




                                                                }
                                                                {selectedValue !== 'text' && selectedValue && headerType !== 'location' && headerType !== 'None' && (

                                                                    <div
                                                                        className="selected-value-box"
                                                                        onClick={handleBoxClick}
                                                                        style={{
                                                                            border: '1px solid #ccc',
                                                                            padding: '10px',
                                                                            marginTop: '10px',
                                                                            cursor: 'pointer',
                                                                        }}
                                                                    >
                                                                        {/* {imgValue ? <img className="template-editImg" src={imgValue} alt="" /> : ""} */}
                                                                        {`Select ${selectedValue}`}<br />
                                                                        {fileName}
                                                                    </div>
                                                                )}

                                                                <input type="file" id="file-input" style={{ display: 'none' }} onChange={handleFileChange} />

                                                                <div>
                                                                </div>

                                                            </div>

                                                            <div className="col-md-12 login-input-group">
                                                                <div className="edit-container sms-template-content"
                                                                    style={{ marginTop: "49px" }}>
                                                                    {editorReady && (<CKEditor
                                                                        initData={BodytextInput}
                                                                        onInstanceReady={(event) => {
                                                                            setEditorInstance(event.editor);
                                                                        }}
                                                                        onChange={handleEditorChange}
                                                                        config={{
                                                                            toolbar: [
                                                                                ["Bold", "Italic", "Underline", "Strike"],
                                                                            ],
                                                                            versionCheck: false,
                                                                            resize_enabled: false,
                                                                            removePlugins: "about",
                                                                            ignoreUnsupportedBanner: true,
                                                                            enterMode: 2,
                                                                            shiftEnterMode: 2,
                                                                            autoParagraph: false,
                                                                            entities: false,
                                                                            entities_latin: false,
                                                                            basicEntities: false,
                                                                            fillEmptyBlocks: false,
                                                                        }}
                                                                    />)}
                                                                </div>
                                                            </div>
                                                            <div style={{ padding: '10px' }}>
                                                                <button onClick={bodyadd} className="add-variables">
                                                                    + Add variable
                                                                </button>
                                                            </div>
                                                            {bodyformValues?.map((list, index) => (
                                                                <div key={index} className="input-container d-flex">
                                                                    <span className="fixed-part">{`{{${index + 1}}}`}</span>
                                                                    <input
                                                                        type="text"
                                                                        value={list.name}
                                                                        autoComplete="off" onChange={(e) => handleBodyChange(index, e)}
                                                                        placeholder=""
                                                                        className="editable-input w-100"
                                                                    />
                                                                </div>
                                                            ))}


                                                            <div className="vendor-create-container mt-5 login-input-group">
                                                                <input
                                                                    type="text"
                                                                    id="vendor-crt-input"
                                                                    className="vendor-crt-input"
                                                                    placeholder=" "
                                                                    required
                                                                    value={footertextInput}
                                                                    onChange={handleFooterChange}
                                                                />
                                                                <label
                                                                    htmlFor="vendor-crt-input"
                                                                    className="vendor-crt-label"
                                                                >
                                                                    <i className="fa-regular fa-window-restore"></i>
                                                                    {" "}
                                                                    Footer (Optional)
                                                                </label>
                                                            </div>
                                                            <div className="whatsapp-content">
                                                                <div className="vendor-create-container whatsapp-under-buttons login-input-group">
                                                                    <div className="campaign-templates m-3 p-2 w-100">
                                                                        <h6 className="campaign-temp-head">Buttons (Optional)</h6>
                                                                        <h6 className="create-word p-1">
                                                                            Create buttons that let customers respond to
                                                                            your message or take action.
                                                                        </h6>
                                                                        <div className="buttons-options" >
                                                                            {buttonQuickOpt ?
                                                                                <div className="row quick-replybtn">
                                                                                    <div className="col-md-6">
                                                                                        <p className="text-xs">Quick Reply Button</p>
                                                                                    </div>
                                                                                    <div className="col-md-6 text-end text-xs" onClick={(e) => { setButtonQuickopt(false); setbuttonActive(false); setquickbtn("None"); setButtonQuicktxt("") }}>
                                                                                        <i className="fa fa-times text-danger"></i>
                                                                                    </div>
                                                                                    <div className="col-md-12 login-input-group">
                                                                                        <p className="text-xs">Button Text</p>
                                                                                        <div className="vendor-create-container">
                                                                                            <input type="text" autoComplete="off" onChange={(e) => { setButtonQuicktxt(e.target.value) }} value={buttonQuicktxt} id="vendor-crt-input" className={`vendor-crt-input`} placeholder=" " required />
                                                                                            <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-a"></i></label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                : ""}
                                                                            {buttonPhoneOpt ?
                                                                                <div className="row mt-3 quick-replybtn">
                                                                                    <div className="col-md-6">
                                                                                        <p className="text-xs">Phone Number Button
                                                                                        </p>
                                                                                    </div>
                                                                                    <div className="col-md-6 text-end text-xs" onClick={() => { setbuttonActive(false); setButtonPhoneopt(false); setphoenobtn("None"); setButtonPhoneNotxt("91"); setButtonPhonetxt("") }}>
                                                                                        <i className="fa fa-times text-danger"></i>
                                                                                    </div>
                                                                                    <div className="col-md-12 login-input-group">
                                                                                        <p className="text-xs">Button Text</p>
                                                                                        <div className="vendor-create-container">
                                                                                            <input type="text" autoComplete="off" onChange={(e) => { setButtonPhonetxt(e.target.value) }} value={buttonPhonetxt} id="vendor-crt-input" className={`vendor-crt-input`} placeholder=" " required />
                                                                                            <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-a"></i></label>
                                                                                        </div>
                                                                                        <br />
                                                                                        <p className="text-xs">Phone Number</p>
                                                                                        <div className="vendor-create-container">
                                                                                            <input type="text" autoComplete="off" maxLength={12} onChange={(e) => { setButtonPhoneNotxt(e.target.value) }} value={buttonPhoneNotxt} id="vendor-crt-input" className={`vendor-crt-input`} placeholder=" " required />
                                                                                            <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-phone"></i></label>
                                                                                        </div>
                                                                                        <div className='error-message-required'>Contact number should starts with country code without 0 or +</div>
                                                                                    </div>
                                                                                </div>
                                                                                : ""}
                                                                            {buttoncopyOpt ?
                                                                                <div className="row mt-3 quick-replybtn">
                                                                                    <div className="col-md-6">
                                                                                        <p className="text-xs">Coupon Code Copy Button
                                                                                        </p>
                                                                                    </div>
                                                                                    <div className="col-md-6 text-end text-xs" onClick={() => { setbuttonActive(false); setButtoncopyopt(false); setcopybtn("None"); setButtonCopycodetxt(""); }}>
                                                                                        <i className="fa fa-times text-danger"></i>
                                                                                    </div>
                                                                                    <div className="col-md-12 login-input-group">
                                                                                        <p className="text-xs">Example</p>
                                                                                        <div className="vendor-create-container">
                                                                                            <input type="text" autoComplete="off" onChange={(e) => { setButtonCopycodetxt(e.target.value) }} value={buttonCopycodetxt} id="vendor-crt-input" className={`vendor-crt-input`} placeholder=" " required />
                                                                                            <label htmlFor="vendor-crt-input" className="vendor-crt-label"></label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                : ""}
                                                                            {buttonurlOpt ?
                                                                                <div className="row mt-3 quick-replybtn">
                                                                                    <div className="col-md-6">
                                                                                        <p className="text-xs">URL Button
                                                                                        </p>
                                                                                    </div>
                                                                                    <div className="col-md-6 text-end text-xs" onClick={() => { setbuttonActive(false); setButtonurlopt(false); seturlbtn("None"); setButtonurltxt(""); setButtonwebUrltxt("") }}>
                                                                                        <i className="fa fa-times text-danger"></i>
                                                                                    </div>
                                                                                    <div className="col-md-12 login-input-group">
                                                                                        <p className="text-xs">Button Text</p>
                                                                                        <div className="vendor-create-container">
                                                                                            <input type="text" autoComplete="off" onChange={(e) => { setButtonurltxt(e.target.value) }} value={buttonurltxt} id="vendor-crt-input" className={`vendor-crt-input`} placeholder=" " required />
                                                                                            <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-a"></i></label>
                                                                                        </div>
                                                                                        <br />
                                                                                        <p className="text-xs">Website URL
                                                                                        </p>
                                                                                        <div className="vendor-create-container">
                                                                                            <input type="text" autoComplete="off" onChange={(e) => { setButtonwebUrltxt(e.target.value) }} value={buttonwebUrltxt} id="vendor-crt-input" className={`vendor-crt-input`} placeholder=" " required />
                                                                                            <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-link"></i></label>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                : ""}
                                                                            {buttondynamicurlOpt ?
                                                                                <div className="row mt-3 quick-replybtn">
                                                                                    <div className="col-md-6">
                                                                                        <p className="text-xs">Dynamic URL Button
                                                                                        </p>
                                                                                    </div>
                                                                                    <div className="col-md-6 text-end text-xs" onClick={() => { setbuttonActive(false); setButtondynamicurlopt(false); setdynamicurlbtn("None"); setButtondynamicUrltxt(""); setButtondynamicwebUrltxt(""); setButtonexampleUrltxt("") }}>
                                                                                        <i className="fa fa-times text-danger"></i>
                                                                                    </div>
                                                                                    <div className="col-md-12 login-input-group">
                                                                                        <p className="text-xs">Button Text</p>
                                                                                        <div className="vendor-create-container">
                                                                                            <input type="text" autoComplete="off" onChange={(e) => { setButtondynamicUrltxt(e.target.value) }} value={buttondynamicUrltxt} id="vendor-crt-input" className={`vendor-crt-input`} placeholder=" " required />
                                                                                            <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-a"></i></label>
                                                                                        </div>
                                                                                        <br />
                                                                                        <p className="text-xs">Website URL
                                                                                        </p>
                                                                                        <div className="vendor-create-container">
                                                                                            <input type="text" autoComplete="off" onChange={(e) => { setButtondynamicwebUrltxt(e.target.value) }} value={buttondynamicwebUrltxt} id="vendor-crt-input" className={`vendor-crt-input`} placeholder=" " required />
                                                                                            <label htmlFor="vendor-crt-input" className="vendor-crt-label"><i className="fa-solid fa-link"></i></label>
                                                                                            <p className="staff-passwordInputicon text-sm">{"{{1}}"}</p>
                                                                                        </div>
                                                                                        <div className="col-md-12 login-input-group">
                                                                                            <p className="text-xs">Example</p>
                                                                                            <div className="vendor-create-container">
                                                                                                <input type="text" autoComplete="off" onChange={(e) => { setButtonexampleUrltxt(e.target.value) }} value={buttonexampleUrltxt} id="vendor-crt-input" className={`vendor-crt-input`} placeholder=" " required />
                                                                                                <label htmlFor="vendor-crt-input" className="vendor-crt-label"></label>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                : ""}
                                                                        </div>
                                                                        <button className="vendor-crt-btn2" onClick={(e)=>{e.preventDefault();handleQuickButtonOpt()}}>
                                                                            <i className="fa-solid fa-reply"></i> Quick Replay
                                                                            Button
                                                                        </button>
                                                                        <button className="vendor-crt-btn2" onClick={(e)=>{e.preventDefault();handlePhoneButtonOpt()}}>
                                                                            <i className="fa-solid fa-phone"></i> Phone Number
                                                                            Button
                                                                        </button>
                                                                        <button className="vendor-crt-btn2" onClick={(e)=>{e.preventDefault();handleCopycodeButtonOpt()}}>
                                                                            <i className="fa-solid fa-clipboard"></i> Copy Code
                                                                            Button
                                                                        </button>
                                                                        <button className="vendor-crt-btn2" onClick={(e)=>{e.preventDefault();handleurlButtonOpt()}}>
                                                                            <i className="fa-solid fa-link"></i> URL Button
                                                                        </button>
                                                                        <button className="vendor-crt-btn2" onClick={(e)=>{e.preventDefault();handleDynamicurlButtonOpt()}}>
                                                                            <i className="fa-solid fa-link"></i> Dynamic URL
                                                                            Button
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                        </div>
                                                        <div className="col-md-5 sticky-top h-100">
                                                            <h5 className="mt-4 tblName">Template Preview</h5>
                                                            <div className="text-end">
                                                                <div className="template-preview">
                                                                    <div className="conversation">
                                                                        <div className="conversation-container">
                                                                            <div className="message received">
                                                                                {/* <span className="metadata"><span className="time"></span></span> */}
                                                                                {headerType && BodyType && footerType && (
                                                                                    <div className="lw-whatsapp-header-placeholder header-value-right-side text-start">
                                                                                        {headerType === 'text' && (
                                                                                            <p className="template-headertxt fw-bold">{textInput}</p>
                                                                                        )}

                                                                                        {headerType === 'video' && (
                                                                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: "35px", background: "gainsboro" }}>
                                                                                                <i className="fa fa-5x fa-play-circle" ></i>
                                                                                            </div>
                                                                                        )}
                                                                                        {headerType === 'image' && (
                                                                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                                                {/* <i className="fa fa-5x fa-image text-white"></i> */}
                                                                                                <img className="w-100" src={imageUrl || imgValue} alt="" />
                                                                                            </div>
                                                                                        )}

                                                                                        {headerType === 'location' && (
                                                                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: "35px", background: "gainsboro" }}>
                                                                                                <i className="fa fa-5x fa-map-marker-alt text-white"></i>
                                                                                            </div>
                                                                                        )}

                                                                                        {headerType === 'document' && (
                                                                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: "35px", background: "gainsboro" }}>
                                                                                                <i className="fa fa-5x fa-file-alt text-white"></i>
                                                                                            </div>
                                                                                        )}
                                                                                        <div>
                                                                                            {(BodyType === 'None' || BodyType === 'text' || BodyType === 'image' || BodyType === 'video' || BodyType === 'document' || BodyType === 'location') && (
                                                                                                <p className="template-bodytxt mt-3" dangerouslySetInnerHTML={{
                                                                                                    __html: BodytextInput
                                                                                                        .replace(/\*(.*?)\*/g, '<b>$1</b>')
                                                                                                        .replace(/_(.*?)_/g, '<i>$1</i>')
                                                                                                        .replace(/~(.*?)~/g, '<strike>$1</strike>')
                                                                                                        .replace(/\n/g, '<br>')
                                                                                                }}></p>
                                                                                            )}

                                                                                        </div>
                                                                                        <div>
                                                                                            {(footerType === 'None' || footerType === 'text' || footerType === 'image' || footerType === 'video' || footerType === 'document' || footerType === 'location') && (
                                                                                                <p className="template-footertxt">{footertextInput}</p>
                                                                                            )}
                                                                                        </div>
                                                                                        <div className="template-buttontxt">
                                                                                            {(quickbtn === 'None' || quickbtn === 'QUICK_REPLY') && (
                                                                                                <p className="template-buttontxt button-option-style text-center">{quickbtn === "QUICK_REPLY" ? <i className="fa-solid fa-reply bt-1"></i> : ""} {buttonQuicktxt}</p>
                                                                                            )}
                                                                                            {(phoenobtn === 'None' || phoenobtn === 'PHONE_NUMBER') && (
                                                                                                <p className="template-buttontxt button-option-style text-center">{phoenobtn === "PHONE_NUMBER" ? <i className="fa-solid fa-phone"></i> : ""} {buttonPhonetxt}</p>
                                                                                            )}
                                                                                            {(copybtn === 'None' || copybtn === 'COPY_CODE') && (
                                                                                                <p className="template-buttontxt button-option-style text-center">{copybtn === "COPY_CODE" ? <i className="fa-solid fa-copy"></i> : ""} {copybtn === "COPY_CODE" ? "Copy Code" : ""}</p>
                                                                                            )}
                                                                                            {(urlbtn === 'None' || urlbtn === 'URL') && (
                                                                                                <p className="template-buttontxt button-option-style text-center">{urlbtn === "URL" ? <i className="fa-solid fa-square-arrow-up-right"></i> : ""} {buttonurltxt}</p>
                                                                                            )}
                                                                                            {(dynamicurlbtn === 'None' || dynamicurlbtn === 'URL') && (
                                                                                                <p className="template-buttontxt button-option-style text-center">{dynamicurlbtn === "URL" ? <i className="fa-solid fa-square-arrow-up-right"></i> : ""} {buttondynamicUrltxt}</p>
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
                                                            <button onClick={vendorWhatsappTemplateCreate} disabled={isLoading} className="btn btn-primary ">
                                                                {isLoading ? ("Submit...") : ("Submit")}
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

export default WhatsappCreateTemplate;