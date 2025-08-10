'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

interface ProductItemProps {
    product: {
        id: string
        title: string
        price: number
        image: string
        rating?: number
    }
    loading?: boolean
    onImageLoad: (productId: string) => void
    onImageError: (productId: string) => void
}

function ProductItem({ product, loading, onImageLoad, onImageError }: ProductItemProps) {
    return (
        <Link
            href={`/products/${product.id}`}
            className="group"
        >
            <div className="relative bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 h-full transition-all hover:shadow-md">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                        </div>
                    )}
                    <Image
                        width={500}
                        height={500}
                        src={product.image || '/placeholder.png'}
                        alt={product.title}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                        onLoad={() => onImageLoad(product.id)}
                        onError={() => onImageError(product.id)}
                        priority={false}
                    />
                    <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-sm">
                        {/* Wishlist icon could go here */}
                    </div>
                </div>

                <div className="p-4">
                    <h3 className="font-medium text-gray-900 line-clamp-1 group-hover:text-blue-600">
                        {product.title}
                    </h3>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                        {product.price}
                    </p>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                        <div className="flex items-center">
                            {product.rating && (
                                <>
                                    <div className="flex text-yellow-400">
                                        {'★'.repeat(Math.floor(product.rating))}
                                        {'☆'.repeat(5 - Math.floor(product.rating))}
                                    </div>
                                    <span className="ml-1">{product.rating}</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductItem