import { motion } from 'framer-motion';
import { AlertCircle, Minus, Plus } from 'lucide-react';


const ProductCard = ({ product, onUpdateStock, isUpdating }) => {
    const { id, name, price, stock, lowStockThreshold, category } = product;

    const isLowStock = stock < lowStockThreshold;
    const isCritical = stock === 0;

    return (
        <motion.div
            layout
            className={`relative p-6 bg-white rounded-xl border transition-shadow duration-200 flex flex-col gap-4 ${isLowStock
                ? 'border-red-200 shadow-sm'
                : 'border-gray-200 shadow-sm hover:shadow-md'
                }`}
        >
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                    <p className="text-gray-400 text-xs mt-1">ID: {id}</p>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-[10px] font-medium mt-2">
                        {category}
                    </span>
                </div>

                {isLowStock && (
                    <span className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${isCritical ? 'bg-red-100 text-red-700' : 'bg-red-50 text-red-600'
                        }`}>
                        <AlertCircle size={12} />
                        {isCritical ? "Out of Stock" : "Low Stock"}
                    </span>
                )}
            </div>

            <div className="flex justify-between items-end mt-auto pt-4">
                <div>
                    <p className="text-xs text-gray-500 mb-1">Price</p>
                    <span className="text-xl font-bold text-gray-900">₹{price.toLocaleString()}</span>
                </div>

                <div className="flex flex-col items-end">
                    <p className="text-xs text-gray-500 mb-2">Stock Level</p>
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-100 transition-colors">
                        <button
                            onClick={() => onUpdateStock(id, Math.max(0, stock - 1))}
                            disabled={stock <= 0 || isUpdating}
                            className="p-1.5 hover:bg-white hover:shadow-sm rounded transition-all disabled:opacity-30 disabled:hover:shadow-none text-gray-600"
                            aria-label="Decrease stock"
                        >
                            <Minus size={16} />
                        </button>

                        <div
                            className="font-mono w-10 text-center font-medium select-none relative text-gray-900"
                        >
                            {stock}
                        </div>

                        <button
                            onClick={() => onUpdateStock(id, stock + 1)}
                            disabled={isUpdating}
                            className="p-1.5 hover:bg-white hover:shadow-sm rounded transition-all disabled:opacity-30 disabled:hover:shadow-none text-gray-600"
                            aria-label="Increase stock"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
