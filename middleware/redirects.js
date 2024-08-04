export default function ({ redirect, route, $auth }) {

  const isAuthenticated = $auth.loggedIn;

  const privatePage = ['/panel', '/panel/orders', '/panel/profile', '/store/card', '/store/placeandtime'];

  if (privatePage.includes(route.path) && !isAuthenticated) {
    return redirect('/login');
  }

  if (route.fullPath.startsWith('/store/productDetail')) {
    const params = route.query;
    const { pk_product, product } = params;

    const newUrl = `/product/${pk_product}/${product}`;

    redirect(301, newUrl);
  }
  if (route.fullPath.startsWith('/store/products')) {
    redirect(301, '/');
  }
}