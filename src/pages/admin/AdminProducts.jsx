import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";

const API_ORIGIN = "https://localhost:49265";
const EMPTY_FORM = { name: "", description: "", price: "", categoryId: "", imageUrl: "" };

export default function AdminProducts() {
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm]           = useState(EMPTY_FORM);
  const [saving, setSaving]       = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await axiosClient.get("/products");
      let list = Array.isArray(data) ? data :
                 Array.isArray(data.data) ? data.data : [];
      list = list.map(p => ({
        ...p,
        category: p.category?.name || "General",
        image: p.imageUrl ? `${API_ORIGIN}${p.imageUrl}` : ""
      }));
      setProducts(list);
    } catch { toast.error("Không tải được danh sách sản phẩm"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const openCreate = () => {
    setEditProduct(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditProduct(p);
    setForm({
      name: p.name, description: p.description,
      price: p.price, categoryId: p.categoryId, imageUrl: p.imageUrl
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.price) { toast.error("Vui lòng điền tên và giá!"); return; }
    setSaving(true);
    try {
      if (editProduct) {
        await axiosClient.put(`/admin/products/${editProduct.id}`, form);
        toast.success("Đã cập nhật sản phẩm!");
      } else {
        await axiosClient.post("/admin/products", form);
        toast.success("Đã thêm sản phẩm!");
      }
      setShowModal(false);
      fetchProducts();
    } catch { toast.error("Lưu thất bại!"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Xóa sản phẩm này?")) return;
    try {
      await axiosClient.delete(`/admin/products/${id}`);
      toast.success("Đã xóa sản phẩm!");
      fetchProducts();
    } catch { toast.error("Xóa thất bại!"); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-['Montserrat'] text-[24px] font-black uppercase tracking-tight text-[#111111]">
          Sản phẩm
        </h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-[#111111] text-white text-[12px] font-bold uppercase tracking-widest rounded hover:bg-[#333333] transition-colors"
        >
          <Plus size={16} /> Thêm sản phẩm
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="h-16 bg-[#F3F4F6] animate-pulse rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E5E5] bg-[#F9FAFB]">
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-[#6B7280]">Ảnh</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-[#6B7280]">Tên</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-[#6B7280]">Danh mục</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-[#6B7280]">Giá</th>
                <th className="px-4 py-3 text-right text-[11px] font-bold uppercase tracking-widest text-[#6B7280]">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={p.id} className={`border-b border-[#E5E5E5] last:border-0 ${i % 2 === 0 ? "" : "bg-[#FAFAFA]"}`}>
                  <td className="px-4 py-3">
                    <div className="w-10 h-12 bg-[#F3F4F6] rounded overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                        onError={e => { e.target.src = "https://placehold.co/80x96/E5E5E5/111111?text=?"; }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 font-bold text-[13px] text-[#111111]">{p.name}</td>
                  <td className="px-4 py-3 text-[12px] text-[#6B7280]">{p.category}</td>
                  <td className="px-4 py-3 font-['PT_Mono'] font-bold text-[13px] text-[#111111]">
                    {(p.price / 1000).toLocaleString()}K
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 text-[#6B7280] hover:text-[#111111] transition-colors">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-1.5 text-[#6B7280] hover:text-red-500 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal thêm/sửa */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-['Montserrat'] text-[16px] font-black uppercase tracking-tight text-[#111111]">
                {editProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-[#6B7280] hover:text-[#111111]">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {[
                { label: "Tên sản phẩm", key: "name",        type: "text"   },
                { label: "Giá (VNĐ)",    key: "price",       type: "number" },
                { label: "Category ID",  key: "categoryId",  type: "number" },
                { label: "URL ảnh",      key: "imageUrl",    type: "text"   },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-1">
                    {label}
                  </label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#D1D5DB] focus:border-[#111111] outline-none transition-colors rounded"
                  />
                </div>
              ))}

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-1">
                  Mô tả
                </label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-[#D1D5DB] focus:border-[#111111] outline-none transition-colors rounded resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 border border-[#E5E5E5] text-[#111111] text-[12px] font-bold uppercase tracking-widest rounded hover:bg-[#F9FAFB] transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-2.5 bg-[#111111] text-white text-[12px] font-bold uppercase tracking-widest rounded hover:bg-[#333333] disabled:bg-[#999] transition-colors"
              >
                {saving ? "Đang lưu..." : "Lưu"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}