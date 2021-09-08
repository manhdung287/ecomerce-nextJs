export const ROUTER ={
    home :'/',
    post:'/post',
    profile:'/profile',
    sigin:'/signin',
    register:'/register',
    product:'/product',
    cart:'/cart',
    payment:'/payment',
    about:'/about',
    order:'/order',
    admin:'/admin',
    productLink: (id)=>`/product/${id}`,
    ordertLink: (id)=>`/order/${id}`,
    userLink:(id)=>`/admin/users/${id}`,
    createProductLink:(id)=>`/create/${id}`,
}