<div align="center">
  <img src="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop" alt="Banner Moustique Tigre" width="100%">

  <h1>Moustique Tigre</h1>
  <p><em>Modèle Bayésien Hiérarchique pour la prédiction spatio-temporelle</em></p>

  <!-- Badges -->
  <a href="#"><img src="https://img.shields.io/badge/Status-Active-success?style=flat-square" alt="Status"></a>
  <a href="#"><img src="https://img.shields.io/badge/UI-Minimalist-black?style=flat-square" alt="UI Style"></a>
  <a href="#"><img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License"></a>
</div>

<br/>

## 📖 Le Contexte (Bối cảnh)

Dự án này là một bài báo tương tác (interactive data journalism) kết hợp giữa thiết kế web phong cách Lookbook và khoa học dữ liệu. Mục tiêu là trực quan hóa sự phân bổ và lây lan của loài muỗi vằn (*Aedes albopictus*) thông qua một **Mô hình Bayes phân cấp**.

Giao diện được thiết kế tối giản, ưu tiên Typography và không gian trắng (whitespace), nhằm làm nổi bật các phương trình toán học và biểu đồ dữ liệu phức tạp.

---

## 📐 L'Architecture du Modèle (Kiến trúc mô hình)

Dự án áp dụng nền tảng của định lý Bayes để ước lượng các tham số phân bố:

$$ P(\theta | y) = \frac{P(y | \theta) P(\theta)}{P(y)} $$

Mô hình phân cấp cho phép tính toán sự thay đổi không gian và thời gian với độ chính xác cao, xử lý hiệu quả các điểm dữ liệu nhiễu trong theo dõi dịch tễ.

---

## 🛠 Tech Stack (Công nghệ sử dụng)

* **Cấu trúc & Giao diện:** HTML5 Semantic, Vanilla CSS (Flexbox/Grid).
* **Tương tác:** Vanilla JavaScript (Intersection Observer API cho hiệu ứng Fade-in).
* **Toán học & Dữ liệu:** 
  * `MathJax` / `KaTeX` để render công thức chuẩn xác.
  * `Chart.js` / `D3.js` cho phần trực quan hóa dữ liệu (Data Visualization).

---

## 🚀 Installation & Usage (Cài đặt & Sử dụng)

Dự án này là một trang web tĩnh hoàn toàn, không yêu cầu cài đặt Node.js hay server backend phức tạp.

1. **Clone repository này về máy:**
```bash
   git clone [https://github.com/your-username/moustique-tigre.git](https://github.com/your-username/moustique-tigre.git)
