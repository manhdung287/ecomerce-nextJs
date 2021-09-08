import React from 'react';

function TextPrice({value,className}){
    const formatValue = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    return(
        <span className={className}>
            {formatValue}
        </span>
    );
};
export default TextPrice;