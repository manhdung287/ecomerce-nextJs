import React, { useContext, useEffect, useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { DataContext } from "../../../store/GlobaState";
import Select from "react-select";
import { useRouter } from "next/router";
import { AiFillDelete } from "react-icons/ai";
import UploadImage from "../../../untils/uploadImage";
import { deleteData, getData, postData, putData } from "../../../untils/fetchData";
import styles from "./createProduct.module.scss";
import Modal from "../../../components/Modal";
import { ROUTER } from "../../../untils/router";
import { createCategory } from "../../../store/Actions";

const ProductManger = () => {
  const initlState = {
    title: "",
    description: "",
    content: "",
    size: "",
    category: "",
    price: 0,
    price1: 0,
    sold: 0,
    inStock: 0,
    images: [],
  };

  const [product, setProduct] = useState(initlState);

  const {
    title,
    description,
    content,
    size,
    category,
    price,
    price1,
    sold,
    inStock,
  } = product;

  const router = useRouter();
  const { id } = router.query;
  const [onEdit, setOnEdit] = useState(false);
  const [closeModal,setCloseModal] = useState(false);
  const [state, dispath] = useContext(DataContext);
  const { auth, categories } = state;
  const [images, setImages] = useState([]);



  const onHandleInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    dispath({ type: "NOTIFY", payload: {} });
  };

  const onChangeSelect = (value, action) => {
    setProduct({ ...product, [action.name]: value.value });
  };
  const onAddCategory = ()=>{
    dispath(createCategory(category));
  }
  const handleUploadImage = (e) => {
    let newImages = [];
    let err = "";
    const files = [...e.target.files];
    if (files.length === 0)
      return dispath({ type: "NOTIFY", payload: { err: "file not Exits" } });

    files.forEach((file) => {
      if (file.size > 1024 * 1024) return (err = "File to largle");
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return (err = "File not format");
      newImages.push(file);
      return newImages;
    });
    if (err) dispath({ type: "NOTIFY", payload: { err: err } });
    setImages([...images, ...newImages]);
  };

  const onDeleteImage = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const onOpenModalDelete =()=>{
    setCloseModal(!closeModal)
  };

  const onDeleteProduct =async () => {
    if(!auth.user.isAdmin) return dispath({payload:'NOTIFY',payload:{err:'Authentocation not valid'}})
   
    const res = await deleteData(`product/${id}`,auth.token);
    
    if(res.err) return dispath({payload:'NOTIFY',payload:{err:res.err}})

    setCloseModal(false);
    router.push(ROUTER.home);
  };

  const onSubmitValue = async (e) => {
    e.preventDefault();
    if (!auth.user.isAdmin)
      return dispath({
        type: "NOTIFY",
        payload: { err: "Authentocation is not valid" },
      });
    if (
      !title ||
      !description ||
      !content ||
      category === "all" ||
      !price ||
      !price1 ||
      !inStock ||
      !images.length === 0
    )
      return dispath({
        type: "NOTIFY",
        payload: { err: "Please add all the fells" },
      });
    if (price < price1)
      return dispath({
        type: "NOTIFY",
        payload: {
          err: "The following price cannot be greater than the previoua price",
        },
      });
    dispath({ type: "NOTIFY", payload: { loading: true } });

    let media = [];
    const imgNewURL = images.filter((img) => !img.url);
    const imgoldUrl = images.filter((img) => img.url);

    if (imgNewURL.length > 0) media = await UploadImage(imgNewURL);

    let res;

    if (onEdit) {
      res = await putData(
        `product/${id}`,
        { ...product, images: [...imgoldUrl, ...media] },
        auth.token
      );
      if (res.err)
        return dispath({ type: "NOTIFY", payload: { err: res.err } });
    } else {
      res = await postData(
        "product",
        { ...product, images: [...imgoldUrl, ...media] },
        auth.token
      );
      if (res.err)
        return dispath({ type: "NOTIFY", payload: { err: res.err } });
    }

    dispath({ type: "NOTIFY", payload: { loading: false } });
    return dispath({ type: "NOTIFY", payload: { success: res.msg } });
  };

  useEffect(() => {
    if (id) {
      setOnEdit(true);
      getData(`product/${id}`).then((res) => {
        setProduct(res.product);
        setImages(res.product.images);
      });
    } else {
      setOnEdit(false);
      setProduct(initlState);
      setImages([]);
    }
  }, [id]);
   console.log(product)
  return (
    <div>
      <div className={styles.flex}>
        <div>
          <Input
            label="title"
            onChange={onHandleInput}
            placeholder="title"
            value={title || ""}
            name="title"
          />
          <Input
            label="Oldprice"
            onChange={onHandleInput}
            placeholder="price"
            value={price || ""}
            name="price"
            type="number"
          />
          <Input
            label="Newprice"
            onChange={onHandleInput}
            placeholder="price1"
            value={price1 || ""}
            name="price1"
            type="number"
          />
          <Input
            label="sold"
            onChange={onHandleInput}
            placeholder="sold"
            value={sold || ""}
            name="sold"
            type="number"
          />
          <Input
            label="inStock"
            onChange={onHandleInput}
            placeholder="inStock"
            value={inStock || ""}
            name="inStock"
            type="number"
          />
          <Input
            label="size"
            onChange={onHandleInput}
            placeholder="size"
            value={size || ""}
            name="size"
          />
        </div>
        <div>
          <textarea
            className={styles.textarea}
            onChange={onHandleInput}
            placeholder="description"
            value={description || ""}
            name="description"
          />
          <textarea
            className={styles.textarea}
            onChange={onHandleInput}
            placeholder="content"
            value={content || ""}
            name="content"
          />
          <Select
            options={categories?.map((item) => ({
              label: item.name,
              value: item._id,
            }))}
            name="category"
            instanceId={categories?.map((item) => item._id)}
            onChange={onChangeSelect}
            value={categories
              .filter((x) => x._id === category)
              .map((item) => ({
                label: item.name,
                value: item._id,
              }))}
            
          />
        </div>
      </div>
      <div>
        <Input
          type="file"
          placeholder="Upload"
          onChange={handleUploadImage}
          multiple={true}
        />
      </div>
      <div>
        {images.map((item, index) => (
          <div className="imaes" key={index}>
            <img src={item.url ? item.url : URL.createObjectURL(item)} />
            <Button
              icon={<AiFillDelete />}
              onClick={() => onDeleteImage(index)}
            />
          </div>
        ))}
      </div>
      <Button
        onClick={onSubmitValue}
        text={id ? "Update" : "Create"}
        type="submit"
      />
      {id ? (
        <div>
           <Button
          onClick={onOpenModalDelete}
          text='Delete'
          type="text"
        />
          <Modal
              closed={closeModal}
              title={title}
              onClose={onOpenModalDelete}
              onClick={onDeleteProduct}
            />
        </div>
       
      ) : null}
    </div>
  );
};
export default ProductManger;
