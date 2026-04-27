'use client';
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSort } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import Link from "next/link";


      export default function addProduct() {

            const [products, setProducts] = useState([]);
            const nameRef = useRef(null);
            const priceRef = useRef(null);
            const imgRef = useRef(null);
            const monthRef = useRef(null);
            const [state, setState] = useState("");
            const [show, setShow] = useState(false);
            const [editElement, SetEditElement] = useState({});
            const sarchRef=useRef([]); 
            const [resarch, setResarch]=useState([]);
            const [showFilter,setShowFilter]=useState(false);

      const getData = async () => {
            try {
                  const response = await fetch("http://localhost:4000/products", {
                  method: "GET"
                  });

                  if (response.ok) {
                  const result = await response.json();
                  setProducts(result);

                  setResarch(result)
                  }
                  else {
                  console.log("Error in Fetching");
                  }
            } catch (error) {
                  console.log("can not connect to DataBase");
            }
      }

      useEffect(() => {
            getData();
      }, []); // مصفوفة فارغة لطلب البيانات مرة واحدة عند التحميل




      /*Start Search */
      function handelChange(text) {
    // إذا كان مربع البحث فارغاً، نعيد عرض كل المنتجات
      if (!text.trim()) {
            setResarch(products);
            return;
      }

      const filtered = products.filter((ele) => {
            return ele.name.toLowerCase().includes(text.toLowerCase());
      });

      setResarch(filtered);
}



      /* Delete Element */
      const DeleteElement = async (id) => {
            try {
                  const response = await fetch(`http://localhost:4000/products/${id}`, {
                  method: `DELETE`,
                  });

                  if (response.ok) {
                  // تحديث الحالة محلياً للحصول على استجابة سريعة
                  setProducts(products.filter((ele) => ele.id !== id));
                  alert("Product deleted successfully!");
                  }
                  else {
                  console.log("Error in Delete Request");
                  }
            } catch (error) {
                  console.log("can not connect to DataBase");
            }
      }

      /* Start Edit Element */
      function ShowPop(ele) {
            setShow(true);
            SetEditElement(ele);
      }

      function handelSubmit(e) {
            e.preventDefault();
            const name = nameRef.current.value;
            const price = priceRef.current.value;
            
            if (name === "" || price === "") {
                  alert("Please fill all fields");
                  return;
            }
            else {
                  updateProductInApi();
            }
      }

      /* Edit the Data API */
      const updateProductInApi = async () => {
            setState("Waitting for response...");

            // نستخدم PATCH بدلاً من PUT للحفاظ على البيانات التي لم نرسلها مثل الصورة (img)
            // إذا أردت استخدام PUT يجب إرسال الكائن كاملاً بما فيه الصورة
            const data = {
                  ...editElement, // ندمج البيانات القديمة مع التعديلات الجديدة
                  name: nameRef.current.value,
                  price: priceRef.current.value
            }

            try {
                  const response = await fetch(`http://localhost:4000/products/${editElement.id}`, {
                  method: "PUT",
                  headers: {
                        "Content-Type": "application/json"
                  },
                  body: JSON.stringify(data)
                  })

                  if (response.ok) {
                  setState("Product Updated Successfully! ✅");
                  setShow(false); // إغلاق النافذة بعد النجاح
                  getData(); // إعادة جلب البيانات لتحديث القائمة
                  ResetInput();
                  }
                  else {
                  setState("Error in Network ❌");
                  }
            } catch (error) {
                  setState("Can not connect to Database 📡");
            }
      }

      function handleClose() {
            setShow(false)
      }

      function ResetInput() {
            if (nameRef.current) nameRef.current.value = "";
            if (priceRef.current) priceRef.current.value = "";
      }



      /*handleShowFilter */
      function handleShowFilter(){
            setShowFilter(!showFilter)
      }

      function handleSortByName() {
            const sorted = [...resarch].sort((a, b) => {
            return a.name.localeCompare(b.name);
            });
            setResarch(sorted); // تحديث الـ State بالنسخة المرتبة
            setShowFilter(false);

      }

      function handleSortByPrice() {
            const sorted = [...resarch].sort((a, b) => {
            return Number(a.price) - Number(b.price); // من الأقل سعراً إلى الأعلى
            });
            setResarch(sorted);
            setShowFilter(false);
      }


      return (
            <>
                  <form className="ProductBox" onSubmit={(e) => e.preventDefault()}>

                  <h3 className="title">Our Product</h3>

                  <div className="searchBox">
                        <input type="text" ref={sarchRef} onChange={(e)=>{handelChange(e.target.value)}} placeholder="Search"></input>
                        <div className="filter" onClick={handleShowFilter}>
                        <FontAwesomeIcon icon={faSort} className="filterIcon"/>
                              {showFilter && <div className="popFilter">
                                    <div className="filterChose">
                                          <p onClick={handleSortByName}>Sort by name</p>
                                          <p onClick={handleSortByPrice}>Sort by price</p>
                                    </div>
                                    </div>}
                        </div>
                        <Link href="/Products/addProducts" className="link">Add Product</Link>

                  </div>
                        

                  <div className="show">
                        {resarch.map((ele) => {
                              return (
                              <div className="productCard" key={ele.id}>
                                    <div className="image">
                                          <Image
                                          src={`/${ele.img}`}
                                          alt={ele.name}
                                          width={200}
                                          height={200}
                                          style={{ objectFit: 'contain' }}
                                          />
                                    </div>

                                    <div className="info">
                                          <div>
                                          <h3>{ele.name}</h3>
                                          <h2>{ele.price}$</h2>
                                          </div>
                                          <div className="buttons">
                                          <FontAwesomeIcon icon={faEdit} className="icon edit" onClick={() => { ShowPop(ele) }} />
                                          <FontAwesomeIcon icon={faTrash} className="icon delet" onClick={() => { DeleteElement(ele.id) }} />
                                          </div>
                                    </div>
                              </div>
                              )
                        })}
                  </div>
                  </form>

                  {/* Start PopEdit */}
                  {show && <div className="EditPoP">
                  <form className="EditCard" onSubmit={handelSubmit}>
                        <div className="CardTitle">
                              <h2>Edit The Product </h2>
                              <div className="close" onClick={handleClose}>X</div>
                        </div>

                        <div className="cont">
                              <div className="name">
                              <label htmlFor="name" >Enter the name of product</label>
                              <input type="text" id="name" placeholder="Enter The Name" ref={nameRef} defaultValue={editElement.name} />
                              </div>

                              <div className="price">
                              <label htmlFor="price">Enter the price</label>
                              <input type="number" id="price" placeholder="Enter the price" ref={priceRef} defaultValue={editElement.price} />
                              </div>
                        </div>

                        <p style={{textAlign: 'center', fontSize: '12px'}}>{state}</p>
                        <button type="submit">Save Changes</button>

                  </form>
                  </div>}
            </>
      )
      }