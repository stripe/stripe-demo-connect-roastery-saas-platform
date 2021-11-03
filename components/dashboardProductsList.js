import Link from 'next/link';

function DashboardProductsList(props) {
  const list = props.list ? [...props.list] : [];

  let listItems = [];

  if (list) {
    listItems = list.map((item) => (
      <li className="item" key={item.id}>
        {item.name && (
          <>
            {<img src={item.images} />}
            <h4>{item.name}</h4>
            <a
              target="_blank"
              href={'https://dashboard.stripe.com/test/products/' + item.id}
            >
              Edit
            </a>
          </>
        )}
        <style jsx>{`
          .item {
            height: 300px;
            position: relative;

            border: 0;
            border-radius: 4px;
            text-align: center;
          }
          .item h4 {
            margin: 0;
            padding: 0;
            font-size: 14px;
          }

          .item a {
            font-size: 14px;
          }

          .item img {
            width: 100%;
            height: 240px;
            object-fit: cover;
            object-position: bottom;
            margin-bottom: 20px;
          }
        `}</style>
      </li>
    ));
  }

  return (
    <ul className="products-list">
      {listItems}

      <style jsx>{`
        .products-list {
          list-style: none;
          padding: 0;
          margin: 10px 0 0 0;

          display: grid;
          grid-template-columns: repeat(1, 1fr);
          grid-gap: 30px;
        }

        @media (min-width: 768px) {
          .products-list {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 992px) {
          .products-list {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </ul>
  );
}

export default DashboardProductsList;
