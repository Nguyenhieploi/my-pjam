import { motion, useScroll, useTransform } from "motion/react";
import { ShoppingBag, Search, Menu, Star, ArrowRight, Instagram, Facebook, Twitter } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

// --- Types ---
interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  tag?: string;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
}

// --- Mock Data ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Serum Cấp Ẩm Đại Dương",
    category: "Chăm sóc da",
    price: "1.950.000đ",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=800",
    tag: "Hữu cơ"
  },
  {
    id: 2,
    name: "Kem Đêm Tảo Biển",
    category: "Chăm sóc da",
    price: "2.300.000đ",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "Toner Khoáng Chất",
    category: "Chăm sóc da",
    price: "850.000đ",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=800",
    tag: "Mới"
  },
  {
    id: 4,
    name: "Mặt Nạ Tảo Lam",
    category: "Trị liệu",
    price: "1.350.000đ",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    name: "Kem Chống Nắng Rạn San Hô",
    category: "Chống nắng",
    price: "1.050.000đ",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=800",
    tag: "Thân thiện môi trường"
  },
  {
    id: 6,
    name: "Sữa Rửa Mặt Sáng Da Ngọc Trai",
    category: "Chăm sóc da",
    price: "1.200.000đ",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 7,
    name: "Dầu Dưỡng Thể Biển Sâu",
    category: "Chăm sóc cơ thể",
    price: "1.600.000đ",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 8,
    name: "Son Dưỡng Thực Vật",
    category: "Chăm sóc môi",
    price: "450.000đ",
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&q=80&w=800",
  }
];

const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Minh Anh",
    rating: 5,
    comment: "Serum Cấp Ẩm Đại Dương mang lại cảm giác tươi mát như làn sóng trên khuôn mặt. Da tôi cuối cùng cũng được làm dịu và cấp ẩm đầy đủ.",
    avatar: "https://i.pravatar.cc/150?u=marina"
  },
  {
    id: 2,
    name: "Hoàng Nam",
    rating: 5,
    comment: "Tôi yêu cách tiếp cận bền vững của thương hiệu. Mặt nạ tảo lam thực sự tuyệt vời để thải độc cho da.",
    avatar: "https://i.pravatar.cc/150?u=julian"
  },
  {
    id: 3,
    name: "Thanh Thủy",
    rating: 5,
    comment: "Tinh khiết, tự nhiên và hiệu quả. Xịt khoáng khoáng chất giờ đã trở thành vật bất ly thân hàng ngày của tôi.",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  }
];

const CATEGORIES = [
  { name: "Chăm Sóc Đại Dương", image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=80&w=800" },
  { name: "Thực Vật Học", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800" },
  { name: "Khoáng Chất", image: "https://images.unsplash.com/photo-1515377662630-cd637d5a9bd1?auto=format&fit=crop&q=80&w=800" },
];

// --- Components ---

const ProductDetail = ({ product, onBack, onSelectProduct }: { product: Product, onBack: () => void, onSelectProduct: (p: Product) => void }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("mô tả");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 bg-brand-cream min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-brand-muted hover:text-brand-gold mb-12 transition-colors"
        >
          <ArrowRight size={14} className="rotate-180" /> Quay lại bộ sưu tập
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-[4/5] bg-brand-rose/20 overflow-hidden shadow-sm"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <span className="text-[12px] uppercase tracking-[0.4em] text-brand-gold mb-4 block font-bold">{product.category}</span>
            <h2 className="text-5xl md:text-6xl font-serif text-brand-ink mb-6">{product.name}</h2>
            <p className="text-2xl font-medium text-brand-gold mb-8">{product.price}</p>
            
            <p className="text-brand-muted leading-relaxed mb-10 text-lg">
              Trải nghiệm sức mạnh thuần khiết từ đại dương với {product.name}. Được chiết xuất từ các loại thực vật biển bền vững và nước biển giàu khoáng chất để nuôi dưỡng sâu và hồi sinh làn da của bạn.
            </p>

            <div className="flex items-center gap-8 mb-12">
              <div className="flex items-center border border-brand-sage rounded-full px-4 py-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 text-brand-muted hover:text-brand-gold">-</button>
                <span className="px-6 font-bold w-12 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 text-brand-muted hover:text-brand-gold">+</button>
              </div>
              <button className="flex-1 bg-brand-gold text-white py-4 rounded-full text-[11px] uppercase tracking-widest font-bold hover:bg-brand-ink transition-all shadow-xl">
                Thêm vào giỏ hàng
              </button>
            </div>

            {/* Tabs */}
            <div className="border-t border-brand-sage pt-8">
              <div className="flex gap-8 mb-6">
                {["mô tả", "thành phần", "cách dùng"].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-[10px] uppercase tracking-widest font-bold pb-2 border-b-2 transition-all ${activeTab === tab ? "border-brand-gold text-brand-gold" : "border-transparent text-brand-muted hover:text-brand-ink"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="text-sm text-brand-muted leading-relaxed min-h-[100px]">
                {activeTab === "mô tả" && (
                  <p>{product.name} đặc trưng của chúng tôi là sự kết hợp đậm đặc của tảo bẹ, tảo lam và các khoáng chất thiết yếu. Nó thẩm thấu sâu vào các lớp biểu bì để cung cấp độ ẩm lâu dài và mang lại vẻ rạng rỡ tự nhiên, khỏe mạnh.</p>
                )}
                {activeTab === "thành phần" && (
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Chiết xuất tảo bẹ nguồn gốc bền vững</li>
                    <li>Tinh chất tảo lam hữu cơ</li>
                    <li>Phức hợp khoáng chất biển sâu</li>
                    <li>Axit Hyaluronic (nguồn gốc thực vật)</li>
                    <li>Nước đại dương tinh khiết</li>
                  </ul>
                )}
                {activeTab === "cách dùng" && (
                  <p>Thoa 2-3 giọt lên da sạch và ẩm vào buổi sáng và buổi tối. Nhẹ nhàng massage theo chuyển động tròn hướng lên trên cho đến khi thẩm thấu hoàn toàn. Sử dụng kèm kem dưỡng ẩm yêu thích của bạn để có kết quả tốt nhất.</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <div className="pt-24 border-t border-brand-sage">
          <h3 className="text-3xl font-serif mb-12 text-center italic text-brand-ink">Hoàn thiện quy trình của bạn</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {PRODUCTS.filter(p => p.id !== product.id).slice(0, 4).map((p, idx) => (
              <ProductCard key={p.id} product={p} idx={idx} onSelect={() => onSelectProduct(p)} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CategoryPage = ({ onSelectProduct }: { onSelectProduct: (p: Product) => void }) => {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const categories = ["Tất cả", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
  
  const filteredProducts = activeCategory === "Tất cả" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 bg-brand-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.6em] text-brand-gold mb-4 block font-bold">Bộ Sưu Tập</span>
          <h2 className="text-5xl md:text-6xl font-serif text-brand-ink">Vẻ Đẹp <span className="italic text-brand-gold">Thuần Khiết</span></h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 text-[10px] uppercase tracking-widest font-bold rounded-full transition-all duration-300 border ${
                activeCategory === cat 
                  ? "bg-brand-gold text-white border-brand-gold shadow-lg" 
                  : "bg-white text-brand-ink border-brand-gold/10 hover:border-brand-gold/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {filteredProducts.map((product, idx) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              idx={idx} 
              onSelect={() => onSelectProduct(product)} 
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <p className="text-brand-muted italic">Không tìm thấy sản phẩm nào trong danh mục này.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Navbar = ({ onHome, onShopAll }: { onHome: () => void, onShopAll: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-brand-cream/90 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-8"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex gap-12 items-center">
          <button onClick={onHome} className="text-2xl lg:text-3xl font-serif tracking-widest uppercase text-brand-ink">Azure</button>
          
          <div className="hidden lg:flex gap-8 text-[11px] uppercase tracking-[0.2em] font-medium">
            <button onClick={onHome} className="hover:text-brand-gold transition-colors">Trang chủ</button>
            <a href="#" className="hover:text-brand-gold transition-colors">Giới thiệu</a>
            <button onClick={onShopAll} className="hover:text-brand-gold transition-colors">Danh mục sản phẩm</button>
            <a href="#" className="hover:text-brand-gold transition-colors">Liên hệ</a>
          </div>
        </div>

        <div className="flex gap-6 items-center">
          <button className="lg:hidden text-brand-ink"><Menu size={20} /></button>
          <button className="text-brand-ink hover:text-brand-gold transition-colors"><Search size={18} /></button>
          <button className="text-brand-ink hover:text-brand-gold transition-colors relative">
            <ShoppingBag size={18} />
            <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center">0</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ onShopAll }: { onShopAll: () => void }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center bg-brand-cream overflow-hidden pt-20">
      {/* Background Gradient & Textures */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-rose/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-sage/20 rounded-full blur-[100px]" />
      </div>

      {/* Floating Elements (Parallax) */}
      <motion.div 
        style={{ y: y1, rotate }}
        className="absolute top-[20%] right-[15%] z-0 opacity-40 hidden lg:block"
      >
        <img 
          src="https://images.unsplash.com/photo-1516559828984-fb3b92374751?auto=format&fit=crop&q=80&w=400" 
          alt="Water Texture" 
          className="w-64 h-64 object-cover rounded-full"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-[15%] left-[5%] z-0 opacity-30 hidden lg:block"
      >
        <img 
          src="https://images.unsplash.com/photo-1501004318641-729e8e22bd5e?auto=format&fit=crop&q=80&w=300" 
          alt="Soft Leaf" 
          className="w-48 h-48 object-cover rounded-full"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ opacity }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-brand-sage/30 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold">
                Clean Beauty • An Toàn • Dịu Nhẹ
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl xl:text-7xl font-serif text-brand-ink mb-8 leading-[0.85] tracking-tighter">
              Đánh Thức <br />
              <span className="italic text-brand-gold font-light">Làn Da Thuần Khiết</span>
            </h1>
            
            <div className="max-w-md">
              <p className="text-brand-muted text-lg md:text-xl mb-12 leading-relaxed font-light">
                Trải nghiệm sức mạnh chữa lành từ đại dương sâu thẳm. Công thức độc quyền giúp nuôi dưỡng làn da từ sâu bên trong, mang lại vẻ đẹp rạng rỡ tự nhiên.
              </p>
              
              <div className="flex flex-wrap gap-6 items-center">
                <button 
                  onClick={onShopAll} 
                  className="group relative overflow-hidden bg-brand-gold text-white px-12 py-6 text-[11px] uppercase tracking-[0.25em] font-bold rounded-full transition-all duration-500 hover:shadow-[0_20px_40px_rgba(14,165,233,0.3)] hover:-translate-y-1"
                >
                  <span className="relative z-10">Khám Phá Ngay</span>
                  <div className="absolute inset-0 bg-brand-ink translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
                
                <button className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold text-brand-ink hover:text-brand-gold transition-colors group">
                  Triết Lý Của Chúng Tôi
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative"
          >
            {/* Main Product Image Container */}
            <div className="relative z-10 aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border-[12px] border-white">
              <img 
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1200" 
                alt="Azure Skincare Product" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-gold/20 to-transparent" />
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 z-20 bg-white p-8 rounded-full shadow-xl border border-brand-cream hidden md:block"
            >
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold mb-1">100%</p>
                <p className="text-[8px] uppercase tracking-widest text-brand-muted">Tự Nhiên</p>
              </div>
            </motion.div>

            {/* Water Drop Decoration */}
            <motion.div
              animate={{ 
                y: [0, 15, 0],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-12 -left-12 z-0 w-40 h-40 bg-brand-rose/40 rounded-full blur-2xl"
            />
          </motion.div>
        </div>
      </div>

    </section>
  );
};

const CategorySection = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CATEGORIES.map((cat, idx) => (
          <motion.div 
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="group relative h-[500px] overflow-hidden cursor-pointer"
          >
            <img 
              src={cat.image} 
              alt={cat.name} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-ink/20 group-hover:bg-brand-ink/40 transition-colors duration-500" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <h3 className="text-3xl font-serif mb-4">{cat.name}</h3>
              <div className="overflow-hidden">
                <span className="text-[10px] uppercase tracking-[0.3em] font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-500 block">
                  Mua Ngay
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ProductCard: React.FC<{ product: Product, idx: number, onSelect: () => void }> = ({ product, idx, onSelect }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      className="group cursor-pointer"
      onClick={onSelect}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-brand-sage/30 mb-6">
        {product.tag && (
          <span className="absolute top-4 left-4 z-10 bg-white px-3 py-1 text-[9px] uppercase tracking-widest font-semibold">
            {product.tag}
          </span>
        )}
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-brand-ink/0 group-hover:bg-brand-ink/5 transition-colors duration-500" />
        <button className="absolute bottom-0 left-0 w-full bg-brand-ink text-white py-4 text-[10px] uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          Xem Chi Tiết
        </button>
      </div>
      <div className="text-center">
        <p className="text-[10px] uppercase tracking-widest text-brand-muted mb-1">{product.category}</p>
        <h4 className="text-lg font-serif mb-2 group-hover:text-brand-gold transition-colors">{product.name}</h4>
        <p className="font-medium text-sm">{product.price}</p>
      </div>
    </motion.div>
  );
};

const FeaturedProducts = ({ onSelectProduct }: { onSelectProduct: (p: Product) => void }) => {
  return (
    <section className="py-24 bg-brand-cream/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-brand-gold mb-4 block font-semibold">Dành Riêng Cho Bạn</span>
            <h2 className="text-4xl md:text-5xl font-serif">Sản Phẩm Thiết Yếu</h2>
          </div>
          <button onClick={() => onSelectProduct(PRODUCTS[0])} className="group flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold mt-6 md:mt-0">
            Xem Tất Cả Sản Phẩm <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {PRODUCTS.map((product, idx) => (
            <ProductCard key={product.id} product={product} idx={idx} onSelect={() => onSelectProduct(product)} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ParallaxSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative h-[70vh] overflow-hidden flex items-center">
      <motion.div style={{ y }} className="absolute inset-0 -z-10 h-[120%]">
        <img 
          src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=2000" 
          alt="Parallax" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-brand-rose/20" />
      </motion.div>
      <div className="max-w-7xl mx-auto px-6 w-full">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="max-w-md bg-brand-beige/80 backdrop-blur-md p-12"
        >
          <h2 className="text-4xl font-serif mb-6 italic">Nghệ Thuật Tự Chăm Sóc</h2>
          <p className="text-brand-muted text-sm leading-relaxed mb-8">
            Trải nghiệm sự kết hợp giữa trí tuệ thực vật và khoa học hiện đại. Các công thức của chúng tôi được chế tạo để nuôi dưỡng làn da và nâng tầm nghi thức hàng ngày của bạn.
          </p>
          <button className="border-b border-brand-ink pb-1 text-[11px] uppercase tracking-widest font-bold hover:text-brand-gold hover:border-brand-gold transition-all">
            Triết Lý Của Chúng Tôi
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const Reviews = () => {
  return (
    <section className="py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-serif mb-16 italic">Khách Hàng Nói Gì</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {REVIEWS.map((review, idx) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-brand-rose/30 p-10 shadow-sm backdrop-blur-sm"
            >
              <div className="flex justify-center gap-1 mb-6 text-brand-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                ))}
              </div>
              <p className="text-brand-ink font-serif text-lg mb-8 leading-relaxed italic">"{review.comment}"</p>
              <div className="flex items-center justify-center gap-4">
                <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                <span className="text-[11px] uppercase tracking-widest font-bold">{review.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-ink text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-serif tracking-widest uppercase mb-8">Azure</h2>
            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-xs">
              Kiến tạo những trải nghiệm làm đẹp sang trọng thông qua các công thức tinh tế và thẩm mỹ vượt thời gian.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-brand-gold transition-colors"><Instagram size={18} /></a>
              <a href="#" className="hover:text-brand-gold transition-colors"><Facebook size={18} /></a>
              <a href="#" className="hover:text-brand-gold transition-colors"><Twitter size={18} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold mb-8">Mua Sắm</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Chăm sóc da</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trang điểm</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Nước hoa</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sản phẩm mới</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold mb-8">Hỗ Trợ</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Giao hàng & Đổi trả</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Câu hỏi thường gặp</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Liên hệ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tìm cửa hàng</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold mb-8">Bản Tin</h4>
            <p className="text-white/60 text-sm mb-6">Đăng ký để nhận các ưu đãi độc quyền và mẹo làm đẹp.</p>
            <form className="flex border-b border-white/20 pb-2">
              <input 
                type="email" 
                placeholder="Địa chỉ email của bạn" 
                className="bg-transparent text-sm w-full outline-none placeholder:text-white/30"
              />
              <button type="submit" className="text-white/60 hover:text-white transition-colors">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-white/40">
            © 2026 Azure Beauty. Bảo lưu mọi quyền.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-white/40">
            <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-white transition-colors">Điều khoản dịch vụ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [view, setView] = useState<"home" | "category" | "detail">("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleHome = () => {
    setView("home");
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  };

  const handleShopAll = () => {
    setView("category");
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setView("detail");
  };

  return (
    <div className="relative">
      <Navbar onHome={handleHome} onShopAll={handleShopAll} />
      
      {view === "detail" && selectedProduct ? (
        <ProductDetail 
          product={selectedProduct} 
          onBack={handleHome} 
          onSelectProduct={handleSelectProduct}
        />
      ) : view === "category" ? (
        <CategoryPage onSelectProduct={handleSelectProduct} />
      ) : (
        <>
          <Hero onShopAll={handleShopAll} />
          <CategorySection />
          <FeaturedProducts onSelectProduct={handleSelectProduct} />
          <ParallaxSection />
          <Reviews />
        </>
      )}
      
      <Footer />
    </div>
  );
}
