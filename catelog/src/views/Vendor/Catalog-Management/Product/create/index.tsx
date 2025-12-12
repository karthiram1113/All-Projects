import React, { useEffect, useRef, useState } from 'react'
import DashboardLayout from '../../../../../layouts/DashboardLayout'
import TopNav from '../../../../../shared/TopNav'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../../../../shared/Footer'
import CatalogUpload from "../../../../../assets/img/Catalog_img&vdo.jpg"
import "./index.css";
import ReactDOM from 'react-dom';
import { Title } from 'chart.js'
import VendorAPI from '../../../../../api/services/vendorLogin/vendorApi'
import { toast } from "react-toastify";

type PreviewFile = {
    file: File;
    url: string;
    type: 'image' | 'video';
    name: string;
    size: string;
    modifiedTime: string;
};

type Category = {
    name: string;
    subs: string[];
};

const categories: Category[] = [
    {
        name: "Antiques & Collectibles",
        subs: [
            "Collectible Appliances",
            "Collectible Coins & Paper Money",
            "Collectible Electronics",
            "Collectible Furniture",
            "Collectible Glassware",
            "Collectible Knives & Swords",
            "Collectible Tools",
            "Other Collectibles",
        ],
    },
    {
        name: "Arts & Crafts",
        subs: ["Painting", "Drawing", "Crafting", "Pottery", "Other Arts"],
    },
    {
        name: "Auto Parts & Accessories",
        subs: [
            "Engines & Components",
            "Tires & Wheels",
            "Interior Accessories",
            "Exterior Accessories",
        ],
    },
    {
        name: "Books, Movies & Music",
        subs: ["Books", "Movies", "Music CDs", "Vinyl", "Audiobooks"],
    },
    {
        name: "Clothing, Shoes & Accessories",
        subs: [
            "Men's Clothing",
            "Women's Clothing",
            "Shoes",
            "Accessories",
        ],
    },
    {
        name: "Electronics",
        subs: [
            "Mobile Phones",
            "Laptops",
            "Tablets",
            "Wearables",
            "Cameras",
        ],
    },
];

const formatSize = (bytes: number) => `${(bytes / 1024).toFixed(2)} KB`;
const formatDate = (date: Date) => date.toLocaleString();

function CatalogProductCreate() {
    const [catalogCondition, setcatalogCondition] = useState<string>("");
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const currencies = [
        { code: "INR", label: "INR - Indian Rupee", symbol: "₹", placeholder: "Enter amount" },
        { code: "USD", label: "USD - US Dollar", symbol: "$", placeholder: "Enter amount" },
        { code: "EUR", label: "EUR - Euro", symbol: "€", placeholder: "Enter amount" },
        { code: "HRK", label: "HRK - Croatian Kuna", symbol: "kn", placeholder: "Enter amount" },
        { code: "HTG", label: "HTG - Haitian Gourde", symbol: "G", placeholder: "Enter amount" },
        { code: "HUF", label: "HUF - Hungarian Forint", symbol: "Ft", placeholder: "Enter amount" },
        { code: "IDR", label: "IDR - Indonesian Rupiah", symbol: "Rp", placeholder: "Enter amount" },
        { code: "ILS", label: "ILS - Israeli New Shekel", symbol: "₪", placeholder: "Enter amount" },
    ];
    const catalogId = localStorage.getItem("catalogId");

    const [value, setValue] = useState("");
    const [touched, setTouched] = useState(false);
    const maxChars = 9999;
    const [currency, setCurrency] = useState(currencies[0]); // default to USD
    const [amount, setAmount] = useState("");
    const [salePrice, setsalePrice] = useState("");
    const [catConditionDrop] = useState<any[]>([
        { "id": 1, "condition": "New" },
        { "id": 1, "condition": "Refurbished" },
        { "id": 1, "condition": "Used (like new)" },
        { "id": 1, "condition": "Used (good)" },
        { "id": 1, "condition": "Used (fair)" },
    ]);

    const [open, setOpen] = useState(false);
    const [panelFlipped, setPanelFlipped] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeIdx, setActiveIdx] = useState<number | null>(null);
    const [subSearchTerm, setSubSearchTerm] = useState("");
    const containerRef = useRef<HTMLDivElement | null>(null);
    const searchInputRef = useRef<HTMLInputElement | null>(null);

    // Open dropdown, focus search
    // const handleInputClick = () => {
    //     setOpen(true);
    //     setPanelFlipped(false);
    //     setActiveIdx(null);
    //     setSearchTerm("");
    //     setSubSearchTerm("");
    //     setTimeout(() => searchInputRef.current?.focus(), 25);
    // };

    const [dropdownPos, setDropdownPos] = useState<{ top: number, left: number, width: number }>({ top: 0, left: 0, width: 0 });
    const [condDropdownPos, setCondDropdownPos] = useState<{ top: number, left: number, width: number }>({ top: 0, left: 0, width: 0 });
    const condBtnRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!dropdownOpen) return;

        const handleDown = (e: MouseEvent) => {
            if (
                condBtnRef.current &&
                !condBtnRef.current.contains(e.target as Node) &&
                !(document.querySelector(".custom-condition-list-pop")?.contains(e.target as Node))
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleDown);
        return () => {
            document.removeEventListener("mousedown", handleDown);
        };
    }, [dropdownOpen]);

    const handleInputClick = () => {
        setOpen(true);
        setPanelFlipped(false);
        setActiveIdx(null);
        setSearchTerm("");
        setSubSearchTerm("");
        setTimeout(() => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setDropdownPos({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX, width: rect.width });
            }
            searchInputRef.current?.focus();
        }, 25);
    };

    // Click outside/esc to close
    useEffect(() => {
        if (!open) return;
        const handleDown = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node) &&
                !(document.querySelector(".dropdown-menu-wrapper")?.contains(e.target as Node))
            ) {
                setOpen(false);
            }
        };
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleDown);
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("mousedown", handleDown);
            document.removeEventListener("keydown", handleEsc);
        };
    }, [open]);


    // Filtered categories
    const filteredCategories = categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filtered subcategories
    const filteredSubs =
        activeIdx !== null
            ? categories[activeIdx].subs.filter((sub) =>
                sub.toLowerCase().includes(subSearchTerm.toLowerCase())
            )
            : [];

    const handleCategoryClick = (i: number) => {
        setActiveIdx(i);
        setPanelFlipped(true);
        setSubSearchTerm("");
    };

    const [selectedCategory, setSelectedCategory] = useState("");

    const handleSubCategoryClick = (sub: string) => {
        if (activeIdx !== null) {
            const mainCategory = categories[activeIdx].name;
            setSelectedCategory(`${mainCategory} > ${sub}`);
            setPanelFlipped(false);
            setOpen(false);
        }
    };


    const handleBack = () => {
        setPanelFlipped(false);
        setActiveIdx(null);
        setTimeout(() => searchInputRef.current?.focus(), 40);
    };

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = currencies.find((c) => c.code === e.target.value);
        if (selected) {
            setCurrency(selected);
            setAmount(""); // Optionally reset amount when currency changes
        }
    };
    const [isOpen, setIsOpen] = useState(false);

    // const toggleDropdown = () => setIsOpen(prev => !prev);
    const navigate = useNavigate();
    const handleItemClick = () => {
        setIsOpen(false);
    };
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [previewFiles, setPreviewFiles] = useState<PreviewFile[]>([]);
    const mediaSave = () => {
        console.log(previewFiles, "previewFiles")
        if (previewFiles.length === 1) {
            document.getElementById("closepopup")?.click();
        }
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []); // safely handle null

        const previewData: PreviewFile[] = files.map(file => ({
            file,
            url: URL.createObjectURL(file),
            type: file.type.startsWith('image') ? 'image' : 'video',
            name: file.name,
            size: formatSize(file.size),
            modifiedTime: formatDate(file.lastModified ? new Date(file.lastModified) : new Date()),
        }));

        setPreviewFiles(prev => [...prev, ...previewData]);
    };
    const handleImageClick = () => {
        fileInputRef.current?.click();
    };
    const handleDelete = (indexToRemove: number) => {
        setPreviewFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    };
    const [checked, setChecked] = useState(false);


    // State for rows
    const [rows, setRows] = useState([
        { id: Date.now(), type: 'main', data: {} }
    ]);

    // State for which row's dropdown is open
    const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);

    const toggleDropdown = (rowIndex: any) => {
        setOpenDropdownIndex(prev => prev === rowIndex ? null : rowIndex);
    };

    // Add Variant
    const handleAddVariant = (rowIndex: any) => {
        const newRows = [...rows];
        newRows.splice(rowIndex + 1, 0, { id: Date.now(), type: 'variant', data: {} });
        setRows(newRows);
        setOpenDropdownIndex(null); // close after action
    };

    // Duplicate Item
    const handleDuplicateItem = (rowIndex: number, count: number = 1) => {
        const newRows = [...rows];
        const baseRow = rows[rowIndex];

        for (let i = 0; i < count; i++) {
            newRows.splice(rowIndex + 1 + i, 0, { ...baseRow, id: Date.now() + i });
        }

        setRows(newRows);
        setOpenDropdownIndex(null);
    };

    const [myState, setState] = useState({
        title: "",
        description: "",
        websiteLink: "",
        price: "",
        salePrice: "",
        facebookProduct: "",
        condition: "",
        availability: 'false',
        status: "",
        brand: "",
        content_id: "",
        currency: "",
        image: null
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        // Special handling for checkbox
        if (type === "checkbox") {
            setState(prev => ({
                ...prev,
                [name]: (e.target as HTMLInputElement).checked ? "true" : "false"
            }));
            return;
        }

        // Special handling for currency dropdown
        if (name === "currency") {
            const selected = currencies.find(c => c.code === value);
            if (selected) setCurrency(selected);
        }

        setState(prev => ({
            ...prev,
            [name]: value,
        }));
    };



    const handleproductcreate = () => {
        const formData = new FormData();

        // Sync derived states before sending
        const finalState = {
            ...myState,
            price: myState.price, // from currency input state
            salePrice: checked ? myState.salePrice : "",
            currency: currency.code,
            catalogId: 750712011140271,
            facebookProduct: activeIdx !== null
                ? categories[activeIdx].name + (panelFlipped && subSearchTerm ? ` > ${subSearchTerm}` : "")
                : myState.facebookProduct,
            condition: catalogCondition
        };

        formData.append("name", finalState.title);
        formData.append("description", finalState.description);
        formData.append("url", finalState.websiteLink);
        formData.append("price", finalState.price);
        formData.append("sale_price", finalState.salePrice);
        formData.append("category", finalState.facebookProduct);
        formData.append("catalog_id", String(1050629163946384));
        formData.append("condition", "new");
        formData.append("availability",  myState.availability === "true" ? "in stock" : "out of stock");
        formData.append("brand", finalState.brand);
        formData.append("retailer_id", finalState.content_id);
        formData.append("currency", finalState.currency);

        previewFiles.forEach((item) => {
            formData.append("image_url", item.file);
        });

        VendorAPI.productCreateAPI(formData)
            .then((responseData: any) => {
                if (responseData.apiStatus.code === '200') {
                    toast.success(responseData.apiStatus.message);
                    navigate("/vendor/catalog/product/details");
                } else {
                    toast.error(responseData.apiStatus.message);
                }
            })
            .catch((error: any) => {
                console.error("Error during product create:", error);
                toast.error("An error occurred while creating the product.");
            });
    };

    const getBack = ()=>{
        navigate("/vendor/catalog/product/details", { state: { fromCreatePage: true } });

    }

    return (
        <>
            <DashboardLayout>
                <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                    <TopNav />
                    <div className="row vendor-breadcrumbs container-fluid py-1 px-3">
                        <div className="col-md-6">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                                    <li className="breadcrumb-item text-sm">
                                        <Link className="opacity-5 tblName" to={"/vendor/dashboard"}>Dashboard</Link>
                                    </li>
                                    <li
                                        className="breadcrumb-item text-sm tblName active"
                                        aria-current="page"
                                    >
                                        Product
                                    </li>
                                </ol>
                                <h6 className="text-start font-weight-bolder mb-0 tblName">Create Product</h6>
                            </nav>
                        </div>
                        <div className="col-md-6 text-end dropdown">
                            <button
                                className="vendor-crt-btn"
                                onClick={getBack}
                            >
                                <span><i className="fa-solid fa-chevron-left"></i> Back</span>
                            </button>
                        </div>
                    </div>

                    <div className="vendor-maincontent container-fluid py-4">

                        <div className="row">
                            <div className="col-12">
                                <div className="card mb-4">

                                    <div className="card-body px-0 pt-0 pb-2">

                                        <div className="table-responsive p-0 table-scroll-wrapper">
                                            {/* {
                                        loading ? (
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: "100px" }}>
                                                <FadeLoader color="#36d7b7" />
                                            </div>
                                        ) : flowListData.length === 0 ? (
                                            <p className="table-list-nodata or-text" style={{ textAlign: "center", marginTop: "40px" }}><span>No data found</span></p>
                                        ) : (
                                            <> */}
                                            <table className="table align-items-center justify-content-center mb-0">
                                                <thead>
                                                    <tr className="vendor-table-mainhead">
                                                        <th className="text-uppercase vendor-table-head text-xxs font-weight-bolder sticky-col-1">
                                                            Actions
                                                        </th>
                                                        <th className="text-uppercase vendor-table-head text-xxs font-weight-bolder ps-2 sticky-col-2">
                                                            Images & Videos
                                                        </th>
                                                        <th className="text-uppercase vendor-table-head text-xxs font-weight-bolder opacity-7 ps-3">
                                                            Title
                                                        </th>
                                                        <th className="text-uppercase vendor-table-head text-xxs font-weight-bolder opacity-7 ps-3">
                                                            Description
                                                        </th>
                                                        <th className="text-uppercase vendor-table-head text-xxs font-weight-bolder opacity-7 ps-3">
                                                            Website link
                                                        </th>
                                                        <th className="text-uppercase vendor-table-head text-xxs font-weight-bolder opacity-7 ps-3">
                                                            Price
                                                        </th>
                                                        <th className="text-uppercase vendor-table-head text-xxs font-weight-bolder opacity-7 ps-3">
                                                            Sale Price
                                                        </th>
                                                        <th className="text-uppercase vendor-table-head text-xxs font-weight-bolder opacity-7 ps-3">
                                                            Facebook product category (Optional)
                                                        </th>
                                                        <th className="text-uppercase vendor-table-head text-xxs font-weight-bolder opacity-7 ps-3">
                                                            Condition
                                                        </th>
                                                        <th className="text-uppercase vendor-table-head text-xxs font-weight-bolder text-center opacity-7 ps-3">
                                                            Availability
                                                        </th>
                                                        <th className="text-uppercase vendor-table-head text-xxs font-weight-bolder text-center opacity-7 ps-3">
                                                            Status
                                                        </th>
                                                        <th className="text-uppercase vendor-table-head text-xxs font-weight-bolder opacity-7 ps-3">
                                                            Brand (Optional)
                                                        </th>
                                                        <th className="text-uppercase vendor-table-head text-xxs font-weight-bolder opacity-7 ps-3">
                                                            Content ID (Optional)
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-start">
                                                    {rows.map((row, index) => (
                                                        <>
                                                            {/* {flowListData?.map((listData: any) => ( */}
                                                            <tr
                                                                // key={listData.id}
                                                                key={row.id}
                                                                className={row.type === 'variant' ? 'variant-row' : ''}
                                                            >
                                                                <td className='sticky-col-1'>
                                                                    <div className="d-flex justify-content-center px-3">
                                                                        <div className="catalog-prddlt actionDelete-tooltip-container">
                                                                            <button
                                                                                className="btn-3 vendorbtn-danger"
                                                                                type="button"
                                                                                data-bs-toggle="modal"
                                                                                // onClick={() => { setbotId(listData?.id);setBotName(listData?.name) }}
                                                                                data-bs-target="#vendordelete"
                                                                                disabled={rows.length == 1}
                                                                            >
                                                                                <span className="btn-inner--icon">
                                                                                    <i className="fa-regular fa-trash-can"></i>
                                                                                </span>
                                                                            </button>
                                                                            <div className="actionDelete-tooltip-text">
                                                                                Delete
                                                                            </div>
                                                                        </div>
                                                                        <div className="align-middle text-start text-sm catalogprd-drop">
                                                                            <div className="catalog-dropdown-container">
                                                                                <div className="catalog-dropdown" onClick={() => toggleDropdown(index)}>
                                                                                    <i className="fa-solid fa-clone"></i>
                                                                                    <i
                                                                                        className={`catalog-chevron fas fa-angle-down ${isOpen ? 'catalog-rotate-dropdown-arrow ' : ''}`}
                                                                                    ></i>
                                                                                </div>

                                                                                {openDropdownIndex === index && (
                                                                                    <div className="catalog-dropdown-menu">
                                                                                        {[
                                                                                            { iconClass: 'fa-regular fa-square-plus', label: 'Add Variant', action: () => handleAddVariant(index) },
                                                                                            { iconClass: 'fa-regular fa-clone', label: 'Duplicate Item', action: () => handleDuplicateItem(index) }
                                                                                        ].map((item, idx) => (
                                                                                            <span key={idx} onClick={item.action} className='text-start'>
                                                                                                <i className={item.iconClass} style={{ marginRight: '8px' }}></i>
                                                                                                {item.label}
                                                                                            </span>
                                                                                        ))}
                                                                                    </div>
                                                                                )}

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className=" align-middle text-center text-sm sticky-col-2" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ cursor: "pointer" }}>
                                                                    {previewFiles.length === 0 ? (
                                                                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="33px" height="33px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                                                                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                                                                                <path d="M595 4820 c-220 -30 -422 -174 -519 -371 -82 -168 -77 -54 -74 -1804 l3 -1550 27 -80 c61 -179 187 -329 339 -404 
                                                                        168 -82 30 -75 1633 -79 l1428 -3 62 -43 c519 -369 1241 -182 1521 393 159 326 131 722 -72 1029 -144 217 -422 392 -695 437 
                                                                        l-37 6 -3 962 -3 962 -26 72 c-85 232 -243 385 -469 455 l-75 23 -1490 1 c-820 1 -1517 -2 -1550 -6z m3042 -275 c145 -43 262
                                                                         -162 299 -304 12 -46 14 -192 14 -840 l0 -785 -372 371 c-362 360 -374 372 -419 378 -33 5 -55 3 -75 -8 -16 -9 -276 -263 -579
                                                                          -566 l-550 -551 -385 384 c-357 356 -388 385 -427 391 -28 4 -50 2 -70 -8 -15 -9 -205 -193 -420 -410 l-393 -394 0 991 c0 1074
                                                                           -1 1048 54 1147 49 88 156 172 261 205 32 10 355 13 1526 13 1294 1 1492 -1 1536 -14z m131 -2236 c-103 -32 -167 -64 -288 -144
                                                                            -315 -208 -492 -626 -425 -1006 17 -101 75 -275 110 -335 l26 -44 -1263 3 c-892 2 -1279 7 -1316 15 -168 36 -294 155 -337 317
                                                                             -12 47 -15 124 -15 385 l0 325 426 433 c234 237 431 432 437 432 7 0 181 -169 387 -375 400 -400 406 -405 480 -385 28 8 149
                                                                              124 590 565 l555 555 358 -358 357 -357 -82 -26z m425 -224 c189 -21 395 -146 512 -310 224 -315 184 -733 -94 -1005 -143 
                                                                              -139 -322 -210 -531 -210 -216 0 -405 82 -561 244 -137 141 -196 281 -206 486 -11 234 58 409 227 581 127 129 272 199 450
                                                                               219 74 8 87 7 203 -5z" /><path d="M1861 3700 c-106 -22 -203 -99 -249 -198 -23 -49 -27 -70 -27 -147 0 -78 4 -97 28 
                                                                               -147 60 -122 164 -190 303 -196 125 -6 217 37 294 136 64 83 86 205 55 308 -50 170 -231 279 -404 244z" />
                                                                                <path d="M4030 1879 c-30 -12 -346 -323 -366 -361 -46 -87 14 -188 111 -188 47 0 69 12 128 68l47 46 0 -288 c0 
                                                                               -272 1 -291 20 -321 39 -64 125 -81 184 -38 53 38 56 58 56 364 l0 283 54 -53 c46 -46 61 -54 101 -59 107 -12 174
                                                                                81 131 181 -17 40 -331 352 -369 366 -34 13 -63 13 -97 0z" /></g></svg>
                                                                    ) : (
                                                                        <div className="image-stack">
                                                                            {previewFiles.map((item, index) => (
                                                                                <img
                                                                                    key={index}
                                                                                    src={item.url}
                                                                                    alt={item.name}
                                                                                    className="stack-thumb"
                                                                                    style={{
                                                                                        left: `${index * 8}px`,
                                                                                        zIndex: previewFiles.length - index,
                                                                                        width: "50px"
                                                                                    }}
                                                                                />
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </td>
                                                                <td className=" align-middle col-md-12 text-start text-sm" catalogInput-tdwidth>
                                                                    <div className="w-100">
                                                                        <div className="login-input-group">
                                                                            <div className="vendor-create-container w-100">
                                                                                <input
                                                                                    autoComplete="off"
                                                                                    type="text"
                                                                                    name='title'
                                                                                    id="vendor-crt-input"
                                                                                    className="vendor-crt-input catalogInput-Width"
                                                                                    placeholder=" "
                                                                                    value={myState.title} onChange={handleChange}
                                                                                />
                                                                                <label htmlFor="vendor-crt-input" className="vendor-crt-label">
                                                                                    <i className="fa-brands fa-battle-net"></i> Title
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>

                                                                <td className="align-middle col-md-12 text-start text-sm catalogInput-tdwidth">
                                                                    <div className="description-wrapper">
                                                                        <div className={`description-input-box ${myState.description ? "active" : ""}`}>
                                                                            <textarea
                                                                                className="small-placeholder"
                                                                                placeholder="Describe the features and benefits"
                                                                                name="description"
                                                                                value={myState.description}
                                                                                onChange={handleChange}
                                                                                maxLength={maxChars}
                                                                                onFocus={() => setTouched(true)}
                                                                                onBlur={() => setTouched(true)}
                                                                            />
                                                                            <span className="char-counter">
                                                                                {myState.description?.length || 0}/{maxChars}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </td>

                                                                <td className=" align-middle col-md-12 text-start text-sm catalogInput-tdwidth ">
                                                                    <div className="w-100">
                                                                        <div className="login-input-group">
                                                                            <div className="vendor-create-container w-100">
                                                                                <input
                                                                                    autoComplete="off"
                                                                                    type="text"
                                                                                    name="websiteLink"
                                                                                    value={myState.websiteLink}
                                                                                    onChange={handleChange}
                                                                                    id="vendor-crt-input"
                                                                                    className="vendor-crt-input catalogInput-Width"
                                                                                    placeholder=" "
                                                                                    required
                                                                                />
                                                                                <label htmlFor="vendor-crt-input" className="vendor-crt-label">
                                                                                    <i className="fa-solid fa-globe"></i> Website link
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="catalogInput-tdwidth">
                                                                    <div className="wrapper catalogCurrency-cnt">
                                                                        <form className="form-inline">
                                                                            <div className="input-group">
                                                                                <div className="currency-addon">
                                                                                    <select
                                                                                        style={{ outline: 'none', boxShadow: 'none', border: 'none' }}
                                                                                        className="currency-selector"
                                                                                        name="currency"
                                                                                        value={myState.currency}
                                                                                        onChange={handleChange}
                                                                                    >
                                                                                        {currencies.map((cur) => (
                                                                                            <option
                                                                                                key={cur.code}
                                                                                                value={cur.code}
                                                                                                data-symbol={cur.symbol}
                                                                                                data-placeholder={cur.placeholder}
                                                                                            >
                                                                                                {cur.code}
                                                                                            </option>
                                                                                        ))}
                                                                                    </select>
                                                                                </div>
                                                                                <div className="currency-symbol">{currency.symbol}</div>
                                                                                <input
                                                                                    style={{ boxShadow: 'none' }}
                                                                                    type="text"
                                                                                    className="form-control catalog-currencyInpt currency-amount px-2"
                                                                                    placeholder={currency.placeholder}
                                                                                    name="price"
                                                                                    value={myState.price}
                                                                                    onChange={handleChange}
                                                                                />
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className={`custom-amount-box catalogCurrency-cnt ${checked ? 'checked' : ''}`}>
                                                                        <div
                                                                            className={`checkbox-box ${checked ? 'checked' : ''}`}
                                                                            onClick={() => setChecked(!checked)}>
                                                                            {checked && <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                                                                width="14px" height="14px" viewBox="0 0 512.000000 512.000000"
                                                                                preserveAspectRatio="xMidYMid meet">
                                                                                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                                                                    stroke="none">
                                                                                    <path d="M4805 4281 c-1007 -372 -2093 -1036 -3085 -1884 -103 -88 -138 -113
                                                            -146 -104 -7 7 -136 198 -288 424 -153 227 -286 418 -297 424 -28 15 -31 13
                                                            -474 -369 -290 -249 -381 -333 -383 -352 -2 -21 118 -156 732 -822 405 -437
                                                            743 -799 752 -802 28 -11 56 17 118 115 239 378 626 898 916 1229 514 587
                                                            1046 1073 2100 1917 252 201 269 222 218 257 -12 9 -25 16 -28 16 -3 -1 -63
                                                            -22 -135 -49z"/>
                                                                                </g>
                                                                            </svg>
                                                                            }
                                                                        </div>
                                                                        <input
                                                                            type="text"
                                                                            className="amount-input"
                                                                            // value={checked ? `${currency.symbol} ${salePrice.replace(new RegExp(`[${currency.symbol}]`, 'g'), '').trim()}` : ''}
                                                                            // onChange={(e) => setsalePrice(e.target.value.replace(new RegExp(`[${currency.symbol}]`, 'g'), '').trim())}
                                                                            disabled={!checked}
                                                                            name="salePrice"
                                                                            value={myState.salePrice}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td className="text-center align-middle vendor-login-td" style={{ position: 'relative', zIndex: 1 }}>
                                                                    <div
                                                                        className="dropdown-container login-input-group"
                                                                        ref={containerRef}
                                                                        style={{ width: 350, position: "relative" }}
                                                                    >
                                                                        <input
                                                                            className="vendor-crt-input loginfilled-frame-username"
                                                                            id="vendor-crt-input"
                                                                            type="text"
                                                                            placeholder="Select Categorie"
                                                                            readOnly
                                                                            onClick={handleInputClick}
                                                                            value={selectedCategory}
                                                                        />
                                                                        <span
                                                                            className={`dropdown-chevron${open ? " open" : ""}`}
                                                                            aria-hidden="true"
                                                                        >
                                                                            &#9662;
                                                                        </span>
                                                                        {open && ReactDOM.createPortal(
                                                                            <div
                                                                                className={`dropdown-menu-wrapper open`}
                                                                                tabIndex={-1}
                                                                                style={{
                                                                                    position: 'absolute',
                                                                                    top: dropdownPos.top,
                                                                                    left: dropdownPos.left,
                                                                                    width: dropdownPos.width,
                                                                                    zIndex: 2050,
                                                                                }}
                                                                            >
                                                                                <div className="panel-flip">
                                                                                    <div className={`inner-flip${panelFlipped ? " show-sub" : ""}`}>
                                                                                        <div className="menu-panel">
                                                                                            <input
                                                                                                className="search-internal"
                                                                                                type="text"
                                                                                                placeholder="Search"
                                                                                                value={searchTerm}
                                                                                                onChange={e => setSearchTerm(e.target.value)}
                                                                                                ref={searchInputRef}
                                                                                                autoFocus={open && !panelFlipped}
                                                                                                onKeyDown={e => {
                                                                                                    if ((e as React.KeyboardEvent).key === "Escape") setOpen(false);
                                                                                                }}
                                                                                            />
                                                                                            <ul className="menu-list">
                                                                                                {filteredCategories.length === 0 ? (
                                                                                                    <li style={{ color: "#b0b3bb", fontStyle: "italic" }}>
                                                                                                        No categories found
                                                                                                    </li>
                                                                                                ) : (
                                                                                                    filteredCategories.map((cat, i) => {
                                                                                                        const realIdx = categories.findIndex((c) => c.name === cat.name);
                                                                                                        return (
                                                                                                            <li
                                                                                                                key={cat.name}
                                                                                                                className={activeIdx === realIdx ? "active" : ""}
                                                                                                            >
                                                                                                                <span
                                                                                                                    className="cat-name"
                                                                                                                    onClick={() => handleCategoryClick(realIdx)}
                                                                                                                >
                                                                                                                    {cat.name}
                                                                                                                </span>
                                                                                                                <span className="arrow">&#8250;</span>
                                                                                                            </li>
                                                                                                        );
                                                                                                    })
                                                                                                )}
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div className="submenu-panel">
                                                                                            <div className="back-row" tabIndex={0} onClick={handleBack}>
                                                                                                <span className="back-arrow">&#8249;</span>
                                                                                                <span id="catTitle">
                                                                                                    {activeIdx !== null ? categories[activeIdx].name : ""}
                                                                                                </span>
                                                                                            </div>
                                                                                            <input
                                                                                                className="search-internal"
                                                                                                type="text"
                                                                                                placeholder="Search Subcategories"
                                                                                                style={{ marginTop: "8px", marginBottom: "4px" }}
                                                                                                value={subSearchTerm}
                                                                                                onChange={e => setSubSearchTerm(e.target.value)}
                                                                                                autoFocus={panelFlipped}
                                                                                                onKeyDown={e => {
                                                                                                    if ((e as React.KeyboardEvent).key === "Escape") setOpen(false);
                                                                                                }}
                                                                                            />
                                                                                            <ul className="submenu-list">
                                                                                                {panelFlipped && filteredSubs.length === 0 && (
                                                                                                    <li style={{ color: "#b0b3bb", fontStyle: "italic" }}>
                                                                                                        No subcategories found
                                                                                                    </li>
                                                                                                )}
                                                                                                {panelFlipped &&
                                                                                                    filteredSubs.map((sub) => (
                                                                                                        <li
                                                                                                            key={sub}
                                                                                                            onClick={() => handleSubCategoryClick(sub)}
                                                                                                        >
                                                                                                            {sub}
                                                                                                        </li>
                                                                                                    ))}
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>,
                                                                            document.body
                                                                        )}

                                                                    </div>
                                                                </td>

                                                                <td className="align-middle col-md-12 text-start text-sm catalogInput-tdwidth mt-2" style={{ minWidth: 210, position: 'relative' }}>
                                                                    <div className="custom-condition-dropdown-wrap login-input-group">
                                                                        <div
                                                                            className={`vendor-crt-input catalogInput-Width custom-condition-field${dropdownOpen ? " open" : ""}`}
                                                                            ref={condBtnRef}
                                                                            tabIndex={0}
                                                                            onClick={() => {
                                                                                if (!dropdownOpen && condBtnRef.current) {
                                                                                    const rect = condBtnRef.current.getBoundingClientRect();
                                                                                    setCondDropdownPos({
                                                                                        top: rect.bottom + window.scrollY,
                                                                                        left: rect.left + window.scrollX,
                                                                                        width: rect.width,
                                                                                    });
                                                                                }
                                                                                setDropdownOpen(o => !o);
                                                                            }}
                                                                            onBlur={() => setTimeout(() => setDropdownOpen(false), 110)}
                                                                            role="button"
                                                                            aria-haspopup="listbox"
                                                                            aria-expanded={dropdownOpen}
                                                                        >
                                                                            {catalogCondition
                                                                                ? <span>{catalogCondition}</span>
                                                                                : <span className="custom-condition-placeholder vendor-create-container w-100">Select condition</span>
                                                                            }
                                                                            <span className={`custom-condition-chevron${dropdownOpen ? " active" : ""}`}>&#9662;</span>
                                                                        </div>

                                                                        {dropdownOpen && ReactDOM.createPortal(
                                                                            <div
                                                                                className="custom-condition-list-pop"
                                                                                role="listbox"
                                                                                style={{
                                                                                    position: 'absolute',
                                                                                    top: condDropdownPos.top,
                                                                                    left: condDropdownPos.left,
                                                                                    width: condDropdownPos.width,
                                                                                    zIndex: 3000, // Make sure it's above table, tweak as needed
                                                                                }}
                                                                            >
                                                                                <ul className="custom-condition-list">
                                                                                    {catConditionDrop.length === 0
                                                                                        ? <li className="custom-condition-item" style={{ color: "#b1bac9", textAlign: "center" }}>No data found</li>
                                                                                        : catConditionDrop.map((dropdownValue, id) => (
                                                                                            <li
                                                                                                key={dropdownValue.condition}
                                                                                                className={
                                                                                                    "custom-condition-item" +
                                                                                                    (catalogCondition === dropdownValue.condition ? " selected" : "")
                                                                                                }
                                                                                                tabIndex={0}
                                                                                                onClick={() => {
                                                                                                    setcatalogCondition(dropdownValue.condition);
                                                                                                    setDropdownOpen(false);
                                                                                                }}
                                                                                                onKeyDown={e => {
                                                                                                    if (e.key === "Enter" || e.key === " ") {
                                                                                                        setcatalogCondition(dropdownValue.condition);
                                                                                                        setDropdownOpen(false);
                                                                                                    }
                                                                                                }}
                                                                                                role="option"
                                                                                                aria-selected={catalogCondition === dropdownValue.condition}
                                                                                            >
                                                                                                {dropdownValue.condition}
                                                                                            </li>
                                                                                        ))}
                                                                                </ul>
                                                                            </div>,
                                                                            document.body
                                                                        )}

                                                                    </div>
                                                                </td>

                                                                <td className="text-center align-middle vendor-login-td">
                                                                    <div className="form-check form-switch ms-1 pt-4 is-filled">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="checkbox"
                                                                            id="flexSwitchCheckDefault"
                                                                            name="availability"
                                                                            checked={myState.availability === "true" ? true : false}
                                                                            onChange={handleChange}
                                                                        /><span className='text-sm fs-6'>In Stock</span>
                                                                    </div>
                                                                </td>
                                                                <td className="text-center align-middle vendor-login-td">
                                                                    <div className="form-check form-switch pt-4 ms-1 is-filled">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="checkbox"
                                                                            name="status"
                                                                            checked={myState.status === "true" ? true : false}
                                                                            onChange={handleChange}
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td className=" align-middle col-md-12 text-start text-sm catalogInput-tdwidth ">
                                                                    <div className="w-100">
                                                                        <div className="login-input-group">
                                                                            <div className="vendor-create-container w-100">
                                                                                <input
                                                                                    autoComplete="off"
                                                                                    type="text"
                                                                                    id="vendor-crt-input"
                                                                                    className="vendor-crt-input catalogInput-Width"
                                                                                    placeholder=" "
                                                                                    name="brand"
                                                                                    value={myState.brand}
                                                                                    onChange={handleChange}
                                                                                />
                                                                                <label htmlFor="vendor-crt-input" className="vendor-crt-label">
                                                                                    <i className="fa-solid fa-award"></i> Brand
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>


                                                                <td className=" align-middle col-md-12 text-start text-sm catalogInput-tdwidth ">
                                                                    <div className="w-100">
                                                                        <div className="login-input-group">
                                                                            <div className="vendor-create-container w-100">
                                                                                <input
                                                                                    autoComplete="off"
                                                                                    type="text"
                                                                                    id="vendor-crt-input"
                                                                                    className="vendor-crt-input catalogInput-Width"
                                                                                    placeholder=" "
                                                                                    name="content_id"
                                                                                    value={myState.content_id}
                                                                                    onChange={handleChange}
                                                                                />
                                                                                <label htmlFor="vendor-crt-input" className="vendor-crt-label">
                                                                                    <i className="fa-solid fa-square-pen"></i> Content Id
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </td>


                                                            </tr>
                                                        </>
                                                    ))}
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                    <div className='p-3'>
                                        <div className="btn-group">
                                            <button className="btn btn-primary" type="button" onClick={() => handleDuplicateItem(0, 1)}>
                                                + New Item
                                            </button>
                                            <button type="button" className="btn btn-primary rounded-end" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="catalog-chevron fas fa-angle-down"></i>
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item" href="#" onClick={() => handleDuplicateItem(0, 5)}>5 Items</a></li>
                                                <li><a className="dropdown-item" href="#" onClick={() => handleDuplicateItem(0, 10)}>10 Items</a></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className='text-end p-3'>
                                        <Link to={'/vendor/catalog/product/details'}> <button className='btn btn-secondary' style={{ marginRight: "5px" }}>Cancel</button> </Link>
                                        <button className='btn btn-primary' onClick={handleproductcreate}>Upload items</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="modal fade"
                        id="exampleModal"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content all-modal-content">
                                <div className="modal-header import-popup-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                                        Add Images and Videos
                                    </h1>
                                </div>
                                <div className='ps-3'>
                                    <p className='text-sm'>Your images and videos need to be at least 500 × 500 pixels, and no larger than 8 MB for images and 100 MB for videos.</p>
                                </div>
                                <div className="modal-body text-center px-3 p-0">
                                    <form className="form-container" encType="multipart/form-data">
                                        <div className="upload-files-container" onDragOver={(e) => e.preventDefault()}
                                        //  onDrop={handleFileDrop}
                                        >
                                            <div className="drag-file-area">
                                                <div>
                                                    <img onClick={handleImageClick} className='browse-files-text w-75 mb-4' src={CatalogUpload} alt="" />
                                                </div>
                                                <p className="dynamic-message mt-2 mb-n1 tblName">
                                                    Drop Anywhere to Import
                                                </p>
                                                <label className="label tblName">
                                                    or{" "}
                                                    <span className="browse-files">
                                                        <input
                                                            multiple
                                                            type="file"
                                                            className="default-file-input"
                                                            onChange={handleFileChange}
                                                            ref={fileInputRef}
                                                        />
                                                        <span className="browse-files-text text-dark">
                                                            browse file
                                                        </span>{" "}
                                                        <span className='tblName'>from device</span>
                                                    </span>
                                                </label>
                                            </div>
                                            <div className="upload-container">
                                                {previewFiles.map((item, index) => (
                                                    <div className="upload-item" key={index}>
                                                        <div className="upload-thumbnail">
                                                            {item.type === 'image' ? (
                                                                <img src={item.url} alt={item.name} />
                                                            ) : (
                                                                <video controls>
                                                                    <source src={item.url} type={item.file.type} />
                                                                </video>
                                                            )}
                                                        </div>
                                                        <div className="upload-details">
                                                            <p ><strong>{item.name}</strong></p>
                                                            <p>Size: {item.size}</p>
                                                            <p>Modified Time: {item.modifiedTime}</p>
                                                            <button type="button" onClick={() => handleDelete(index)}><i className="fa-solid fa-trash catalog-imgUpload"></i></button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer d-flex border-0 justify-content-end">
                                    <button type="button"
                                        //  onClick={() => { setFileName('') }} 
                                        className="bg-transparent border-0" data-bs-dismiss="modal" id="closepopup"
                                    >
                                    </button>
                                    <button type="button"
                                        //  onClick={() => { setFileName('') }} 
                                        className="btn btn-secondary" data-bs-dismiss="modal" id="closepopup1"
                                        // onClick={() => setPreviewFiles([])}
                                        onClick={getBack}
                                        >
                                        Close
                                    </button>
                                    <button type="button" className="btn btn-primary import-btn-bg"
                                        onClick={mediaSave}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </main>
            </DashboardLayout>
        </>
    )
}

export default CatalogProductCreate