import React from "react";
{/* Sayfa değiştime butonlarını yazdır */}
const Pagination = ({ totalPages,  page, setPage }) => {
  const getPageNumbers = () => {
      const pages = []
      //Bu kısım varsa ilk 3 sayfayı yazdırılmamışsa son sayfayı, seçili sayfa, seöili sayfadan önceki sayfa ve sonraki sayfayı yazdırır
      //Sayfa sayısı 10 ya da 10'dan az ise bütün sayfaların butonlarını yazdırır
      if(totalPages >= 10){
        pages.push(1)
        if (totalPages >= 2) pages.push(2)
        if (totalPages >= 3) pages.push(3)

        if (page < 3 && page <= totalPages - 2){
            pages.push('...')
        }

        if (page === 3 && page <= totalPages - 2){
            pages.push(page + 1)
            pages.push('...')
        }

        if (page === 4 && page <= totalPages - 2){
            pages.push(page)
            pages.push(page + 1)
            pages.push('...')
        }

        if (page === 5 && page <= totalPages - 2){
            pages.push(page - 1)
            pages.push(page)
            pages.push(page + 1)
            pages.push('...')
        }
  
        if (page > 5 && page < totalPages - 2) {
            pages.push('...')
            pages.push(page - 1)
            pages.push(page)
            pages.push(page + 1)
            pages.push('...')
        }

        if (page === totalPages - 2 && page > 3) {
            pages.push('...')
            pages.push(page - 1)
            pages.push(page)
            pages.push(page + 1)
        }
        if (page === totalPages - 1 && page > 3) {
            pages.push('...')
            pages.push(page - 1)
            pages.push(page)
        }

        if (page === totalPages && page > 3) {
            pages.push('...')
            pages.push(page - 1)
        }

        if (!pages.includes(totalPages)) {
            pages.push(totalPages)
        }
      }
      else {
        for(let i = 1; i <= totalPages; i++){
            pages.push(i)
          }
      }
      return pages
    }
    return(
        <div className="fixed-pagination d-flex justify-content-center mt-4 flex-wrap gap-2 blur-overlay">
        {/* Geri Butonu */}
        <button
          className="btn btn-outline-light"
          disabled={page === 1}
          onClick={() => {
            setPage((prev) => prev - 1)
            window.scrollTo({ top: 0,behavior: 'smooth'})
          }}
        >
          Prev
        </button>
        {/* // */}

        {/* Sayfa sayıları için butonlar */}
        {getPageNumbers(totalPages, page).map((p, i) => (
          <button
            key={i}
            className={`btn ${p === page ? 'btn-primary' : p === '...' ? 'btn-outline-secondary disabled' : 'btn-outline-light'}`}
            disabled={p === '...'}
            onClick={() => {
              if (typeof p === 'number') {
                setPage(p);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            {p}
          </button>
        ))}
        {/* // */}

        {/* İleri Butonu */}
        <button
          className="btn btn-outline-light"
          disabled={page === totalPages}
          onClick={() => {
            setPage((prev) => prev + 1)
            window.scrollTo({ top: 0,behavior: 'smooth'})
          }}
        >
          Next
        </button>
        {/* // */}
      </div>
    )
}
export default Pagination