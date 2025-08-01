// [
//     {
//         prodcutId: '12345',
//         quantity: 2,
//         price: 29.99,
//         name: 'Sample Product',
//         altNames: ['Sample Item', 'Example Product'],
//         image : 'https://example.com/sample-product.jpg',
//     },
//     {
//         productId: '67890',
//         quantity: 1,
//         price: 49.99,
//         name: 'Another Product',
//         altNames: ['Another Item', 'Different Product'],
//         image : 'https://example.com/another-product.jpg',
//     },
//     {
//         productId: '54321',
//         quantity: 3,
//         price: 19.99,
//         name: 'Third Product',
//         altNames: ['Third Item', 'Yet Another Product'],
//         image : 'https://example.com/third-product.jpg',
//     }
// ]

export function getCart(){
    let cartInString = localStorage.getItem("cart");
    
    if(cartInString == null){
        cartInString = "[]"
        localStorage.setItem("cart", cartInString);
    }

    const cart = JSON.parse(cartInString);
    return cart;
}

export function addToCart(product , qty){

    const cart = getCart()

    const existingProductIndex = cart.findIndex((item)=>{
        return item.productId === product.productId;
    })

    if(existingProductIndex == -1){
        cart.push(
            {
                productId: product.productId,
                quantity: qty,
                price: product.price,
                name: product.name,
                altNames: product.altNames,
                image: product.images[0]
            }
        )
        localStorage.setItem("cart", JSON.stringify(cart));
    }else{
        const newQty = cart[existingProductIndex].quantity + qty;
        if(newQty <= 0){
            const newCart = cart.filter((item, index)=>{
                return index !== existingProductIndex;
            })
            localStorage.setItem("cart", JSON.stringify(newCart));

        }else{
            cart[existingProductIndex].quantity = newQty;
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }
}

export function getTotal(){
    const cart = getCart();
    let total = 0;
    cart.forEach((item)=>{
        total += item.quantity * item.price;
    })
    return total;
}