import React, { useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import Button from '../Button';
import Modal from '../Modal';

const CategoryItem=({data,onEdit,onDelete,onOpenModalDelete,closeModal})=>{

    if(!data) return null;
    return(
        <div>
            <p> {data.name}</p>
            <Button
              icon={<AiOutlineEdit />}
              onClick={onEdit}
            />
            <Button icon={<AiOutlineDelete />} onClick={onOpenModalDelete} />
            <Modal
              closed={closeModal}
              title={data.name}
              onClose={onOpenModalDelete}
              onClick={onDelete}
            />
        </div>
    );
}
export default CategoryItem;