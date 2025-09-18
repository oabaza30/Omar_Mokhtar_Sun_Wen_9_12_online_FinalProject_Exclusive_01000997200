import React from 'react'
import { getProducts } from '@/services/products.service';
import { IProduct } from '@/interface/product.interface';
import Productltem from '@/components/products/ProductItem';

export default async function ProductsPage() {
    const { data: products }: { data: IProduct[] } = await getProducts();




    return (
        <section className='pb-20'>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 pb-10 ">
                    {
                        products && products.map((product) => (
                            <Productltem key={product._id} product={product} />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
