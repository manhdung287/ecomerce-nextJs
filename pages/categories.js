import React, { useContext, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { AiOutlineEdit, AiOutlineDelete, AiFillDelete } from "react-icons/ai";

import { DataContext } from "../store/GlobaState";
import { deleteData, postData, putData } from "../untils/fetchData";
import { DeleteItem, UpdateItem } from "../store/Actions";
import Modal from "../components/Modal";
import CategoryItem from "../components/Categories/CategoryItem";

function Categories({}) {
  const [state, dispath] = useContext(DataContext);
  const { categories, auth } = state;
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [closeModal, setCloseModal] = useState(false);

  const onOpenModalDelete = () => {
    setCloseModal(!closeModal);
  };
  const onHandleInput = (e) => {
    setName(e.target.value);
  };

  const onCreateCategory = async () => {
    if (!auth.user )
    return  dispath({ type: "NOTIFY", payload: { err: "Authentocation" } });
    if (!name) return dispath({ type: "NOTIFY", payload: { err: "Name not blank" } });
       dispath({ type: "NOTIFY", payload: { loading: true } });

    let res;
    if (id) {
      res = await putData(`categories/${id}`, { name }, auth.token);
      if (res.err)
        return dispath({ type: "NOTIFY", payload: { err: res.err } });

      dispath(UpdateItem(categories, id, res.category, "ADD_CATEGORIES"));
    } else {
      res = await postData("categories", { name }, auth.token);
      if (res.err)
        return dispath({ type: "NOTIFY", payload: { err: res.err } });
      dispath({
        type: "ADD_CATEGORIES",
        payload: [...categories, res.newCate],
      });
    }

    setName("");
    setId("");
    dispath({ type: "NOTIFY", payload: { success: res.msg } });
    dispath({ type: "NOTIFY", payload: { loading: false } });
  };
  const onHanleEdit = (category) => {
    setId(category._id);
    setName(category.name);
  };
  const onHanleDelete = async (category) => {
    const res = await deleteData(`categories/${category._id}`, auth.token);

    if (res.err) return dispath({ type: "NOTIFY", payload: { err: res.err } });

    dispath({ type: "NOTIFY", payload: { waring: res.msg } });
    
    dispath(DeleteItem(categories, category._id, "ADD_CATEGORIES"));
    setCloseModal(false);
  };
  console.log(auth)
  return (
    <div className="category">
      Category
      <div>
        <Input
          value={name}
          name="name_category"
          onChange={onHandleInput}
          placeholder="Insert name category"
        />
        <Button onClick={onCreateCategory} text={id ? "Update" : "Create"} />
      </div>
      <div>
        <p>List Category</p>
        {categories.map((item) => (
          <CategoryItem
            closeModal={closeModal}
            data={item}
            key={item._id}
            onOpenModalDelete={onOpenModalDelete}
            onEdit={() => onHanleEdit(item)}
            onDelete={() => onHanleDelete(item)}
          />
        ))}
      </div>
    </div>
  );
}
export default Categories;
