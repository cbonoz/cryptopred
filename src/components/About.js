/**
 * Created by cbuonocore on 7/12/17.
 */
import React, {Component} from 'react';

class About extends Component {
    render() {

        return (
            <div>
                {/*<img src={AboutLogo} className="clear banner-image" alt="CryptoAlarms"/>*/}
                <h1 className="about-welcome clear">Welcome to Crypto Predictions</h1>
                <div className="text-brand">
                    <h2>About Us</h2>

                </div>

            </div>
        );
    }
}

About.propTypes = {};
About.defaultProps = {};

export default About;

