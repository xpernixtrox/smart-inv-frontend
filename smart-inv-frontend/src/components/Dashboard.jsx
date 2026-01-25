import { Loader2, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddProductModal from './AddProductModal';
import ProductCard from './ProductCard';


const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${API_URL}/products`);
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();
            setProducts(data);
            setError(null);
        } catch (err) {
            setError("Unable to connect to inventory server.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStock = async (id, newQuantity) => {
        if (newQuantity < 0) return;
        setUpdatingId(id);

        try {
            const response = await fetch(`${API_URL}/update-stock`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, newQuantity }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Update failed');
            }

            const updatedProduct = await response.json();

            setProducts(prev => prev.map(p =>
                p.id === id ? updatedProduct : p
            ));
        } catch (err) {
            alert(err.message);
        } finally {
            setUpdatingId(null);
        }
    };

    const handleAddProduct = async (productData) => {
        const response = await fetch(`${API_URL}/add-product`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || 'Failed to add product');
        }

        const newProduct = await response.json();
        setProducts(prev => [...prev, newProduct]);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const categories = ["All", ...new Set(products.map(p => p.category).filter(Boolean))];

    const filteredProducts = products
        .filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (selectedCategory === "All") {
                return a.category?.localeCompare(b.category || "") || 0;
            }
            return a.name.localeCompare(b.name);
        });

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="animate-spin text-emerald-500" size={48} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-10 text-red-400 bg-red-900/10 rounded-xl border border-red-900/20">
                <h2 className="text-2xl font-bold mb-2">System Error</h2>
                <p>{error}</p>
                <button
                    onClick={() => { setLoading(true); fetchProducts(); }}
                    className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
                >
                    Retry Connection
                </button>
            </div>
        );
    }

    return (
        <div className="relative min-h-[calc(100vh-200px)]">
            <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="relative w-full md:w-64">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-4 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                    <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Category:</span>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${selectedCategory === cat
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                {filteredProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onUpdateStock={handleUpdateStock}
                        isUpdating={updatingId === product.id}
                    />
                ))}

                {filteredProducts.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-400">
                        No products found matching your criteria.
                    </div>
                )}
            </div>

            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-8 right-8 p-4 bg-gray-900 text-white rounded-full shadow-lg hover:shadow-xl hover:bg-black transition-all z-30 flex items-center justify-center"
                aria-label="Add Product"
            >
                <Plus size={24} />
            </button>

            <AddProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddProduct={handleAddProduct}
            />
        </div>
    );
};

export default Dashboard;
