/**
 * Created by cbuonocore on 7/12/17.
 */
import React, {Component} from 'react';
import AboutLogo from '../static/crypto_block_trans_cropped.png'
import NotificationCount from "./NotificationCount";

class About extends Component {
    render() {

        const numCurrencies = 1000;

        return (
            <div>
                <img src={AboutLogo} className="clear banner-image" alt="CryptoAlarms"/>
                <h1 className="about-welcome clear">Welcome to CryptoAlarms</h1>
                <div className="text-brand">
                    <h2>About Us</h2>
                    <p>Bitcoin, Etherium, and Litecoin are some of the more popular cryptocurrencies in
                        circulation today; however, there are actually more than {numCurrencies} cryptocurrencies in circulation as of mid-2017, and this
                        number is constantly growing.</p>

                    <p>CryptoAlarms is a website for setting up free price-change alerts on any of these currencies.</p>

                    <p>It's easy to get started. Simply login with your primary email, and you will be taken to a
                        dashboard where youcan search and discover information for any of the {numCurrencies}+
                        cryptocurrencies.We support the ability to price track any of these currencies.
                        Understand that acting on the price changes of any currency has the potential for large losses and gains.</p>

                    <p>Let CryptoAlarms be your personal assistant for tracking momentum plays of the dominant currency players,
                        such as Bitcoin and Ethereum, and also some of the upcoming currencies, like Monero, Golum,
                        or Ripple.</p>

                    <p>Let us know if you have any questions or feedback about the service. Use the below link, we'd
                        love to get your feedback for improvement or fixes.</p>
                    <p>
                        <a href="https://docs.google.com/forms/d/1eD865gx69RLo89Zatj-XdEBJ3H9MhR1e5lEeUUf2_iI/edit"
                           target="_blank" rel="noopener noreferrer" className="center clear">
                            Feedback Link
                        </a>
                    </p>
                    <NotificationCount/>
                    <p>
                        {/*<Link role="a" to="/privacy">Privacy Policy</Link>*/}
                    </p>
                </div>

            </div>
        );
    }
}

About.propTypes = {};
About.defaultProps = {};

export default About;

