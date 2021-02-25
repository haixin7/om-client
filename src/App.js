import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PageNotFound from './pages/404';
import Page from './constants/page';
import shortid from 'shortid';
import OrderConfirmationPage from './pages/PublicRoute/Order/OrderConfirmation';
import MenuPage from './pages/PublicRoute/Menu';
import MerchantPage from './pages/PublicRoute/Merchant';
import OrderStatusPage from './pages/PublicRoute/Order/OrderStatus';
import ShoppingCart from './pages/PublicRoute/ShoppingCart';

function App() {
	/* eslint-disable no-mixed-spaces-and-tabs */
	return (
		<Router>
			<Switch>
				<Route
					exact

					path='/merchant/:name/shoppingcart'
					render={(history) => <ShoppingCart history={history} />}
				/>
				<Route
					exact
					path='/merchant/:name/menu/:table'
					render={(history) => <MenuPage history={history} />}
				/>
				<Route
					exact
					path='/order/confirmation'
					render={(history) => <OrderConfirmationPage history={history} />}
				/>
				<Route
					exact
					path='/order/status'
					render={(history) => <OrderStatusPage history={history} />}
				/>
				<Route
					exact
					path='/merchant/:name'
					render={(match) => <MerchantPage match={match} />}
				></Route>
				{/* <Route
					exact
					path='/merchant/:name/:table/split/:total'
					render={(history) => <SplitPayment history={history} />}
				></Route> */}
				{Page &&
          Page.AuthPage.map((v) => (
          	<Route
          		exact={v.isExact}
          		render={() => v.component}
          		key={shortid.generate()}
          		path={v.path}
          	/>
          ))}
				{Page &&
          Page.PublicPage.map((v) => (
          	<Route
          		exact={v.isExact}
          		render={() => v.component}
          		key={shortid.generate()}
          		path={v.path}
          	/>
          ))}
				{Page &&
          Page.AuthPage.map((v) => (
          	<Route
          		exact={v.isExact}
          		render={() => v.component}
          		key={shortid.generate()}
          		path={v.path}
          	/>
          ))}
				{Page &&
          Page.PublicPage.map((v) => (
          	<Route
          		exact={v.isExact}
          		render={() => v.component}
          		key={shortid.generate()}
          		path={v.path}
          	/>
          ))}
				{Page &&
          Page.ProtectPage.map((v) => (
          	<Route
          		exact={v.isExact}
          		render={() => v.component}
          		key={shortid.generate()}
          		path={v.path}
          	/>
          ))}
				<Route component={PageNotFound} />
			</Switch>
		</Router>
	);
}
export default App;
