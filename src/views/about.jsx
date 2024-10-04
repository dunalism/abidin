import PropTypes from "prop-types";
// import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import {Accordion, AccordionItem} from "@nextui-org/react";

// Renders h2
function H2({text}) {
    return <h2 className="flex justify-center font-bold text-3xl py-12 dark:text-slate-100">{text}</h2>
}
H2.propTypes = {
    text: PropTypes.string,
};

// Rendering simple paragraph
function P({ text }) {
    return <p className="text-justify py-2 text-xl dark:text-slate-400">{text}</p>;
}
P.propTypes = {
    text: PropTypes.string,
};

// For rendering lists
function List({ text, desc }) {
    return (
        <li className="text-xl font-semibold dark:text-slate-400">
            <span>{text} – </span>
            <span className="font-normal">{desc}</span>
        </li>
    );
}
List.propTypes = {
    text: PropTypes.string,
    desc: PropTypes.string,
};

// Rendering potrait photos
function Figure({ name, job, src }) {
    return (
        <figure className="max-w-36">
            <img
                className="h-auto max-w-full rounded-lg"
                src={src}
                alt="Astarion"
            />
            <figcaption className="mt-2 text-lg text-center font-bold">
                {name}
            </figcaption>
            <figcaption className="mt-0 text-sm text-center">
                {job}
            </figcaption>
        </figure>
    );
}
Figure.propTypes = {
    src: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    job: PropTypes.string.isRequired,
};

export default function About() {
    return (
        <div className="lg:py-24 lg:px-12 justify-center">
            <h1 className="font-bold text-4xl py-12 flex justify-center dark:text-slate-100">
                Why Abidin Exists?
            </h1>
            <div className="ml-6">
                <P text="Many individuals and small businesses are looking for a way to sell unique items but lack access to a broad marketplace. Whether auctioning collectibles, handcrafted goods, or surplus stock, they seek a platform that allows for public bidding and broader visibility. Currently, there is no popular local digital platform for these users to auction their items on a larger scale."/>
            </div>
            <H2 text="Our Motives"/>
            <div className="ml-6">
                <P text="Abidin enables individuals, small groups, and enterprises to publicly auction items, reach a wider audience, and facilitate secure transactions. The goal is to provide an efficient, accessible, and user-friendly auction platform for both buyers and sellers."/>
            </div>

            <H2 text="What We Offer"/>
            <div className="ml-6">
                <P text="We focus on creating a secure and user-friendly experience, ensuring that both sellers and buyers can easily manage their transactions. With integrated user management and bidding tools, Abidin opens up new opportunities for anyone looking to tap into the auction marketplace and maximize visibility across Indonesia."/>
            </div>
            
            <H2 text="Our Vision"/>
            <div className="ml-6">
                <List
                    text="Accessibility"
                    desc="We believe in making auctions accessible to everyone, ensuring that both buyers and sellers participate with ease."
                />
                <List
                    text="Balance"
                    desc="Fair and balanced marketplace where both small businesses and individuals can thrive."
                />
                <List
                    text="Integrity"
                    desc="Our platform operates by promoting trust through transparent processes and secure transactions for all users."
                />
                <List
                    text="Dependability"
                    desc="We are committed to providing a reliable service where users can confidently engage in bidding and auctions."
                />
                <List
                    text="Innovation"
                    desc="To continually innovate our platform to stay ahead of market needs."
                />
                <List
                    text="Networking"
                    desc="By fostering a strong community by connecting buyers and sellers, we are helping users expand their reach."
                />
            </div>

            <div className="mt-4">
                <H2 text="Frequently Asked Question" />
                <Accordion className="">
                    <AccordionItem key="1" aria-label="How Does Bidding Work?" title="How Does Bidding Work?">
                        <P text='Bidding is quite simple. When you find an item you like, click "Bid" and enter your offer. Make sure your bid is higher than the current highest bid. The bidding will continue until the auction timer runs out. The highest bidder at the end of the auction wins the item.' />
                    </AccordionItem>
                    <AccordionItem key="2" aria-label="Are There Any Fees For Participating in Auctions?" title="Are There Any Fees For Participating in Auctions?">
                        <P text='Signing up and participating in auctions on Abidin is free. However, if you win an auction, there may be a transaction fee or commission based on the price of the item you purchased. The details of these fees will be shown during the checkout process.' />
                    </AccordionItem>
                    <AccordionItem key="3" aria-label="Is There a Return or Exchange Policy?" title="Is There a Return or Exchange Policy?">
                        <P text=' All sales made through auctions are final. However, if the item you receive does not match the description or is damaged, you can contact the seller through our platform’s chat feature or report the issue to our support team within 3 days of receiving the item.' />
                    </AccordionItem>
                    <AccordionItem key="4" aria-label="What Should I Do If I Encounter a Problem With a Seller or Buyer?" title="What Should I Do If I Encounter a Problem With a Seller or Buyer?">
                        <P text='If you encounter any issues with a seller or buyer, please send a report through our Customer Support. Our support team will help mediate and resolve the issue.' />
                    </AccordionItem>
                    <AccordionItem key="5" aria-label="How Can I Contact Customer Support?" title="How Can I Contact Customer Support?">
                        <P text='If you have further questions or need assistance, you can contact us through our email: support@abidin.com' />
                    </AccordionItem>
                </Accordion>
            </div>
            
            {/* Meet the mercenary */}
            <h1 className="font-bold text-2xl py-2 my-4 text-center">
                Meet Our Team
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 justify-evenly">
                <Figure
                    name="Farrel Bariz Atalla"
                    job="as Project Manager"
                    src="https://bg3.wiki/w/images/4/4c/Portrait_Volo.png"
                />
                <Figure
                    name="Muhammad Nur Hidayat"
                    job="as Frontend Developer"
                    src="https://bg3.wiki/w/images/c/ca/Portrait_Ettvard_Needle.png"
                />
                <Figure
                    name="Farid Rhamadhan Darari"
                    job="as Frontend Developer"
                    src="https://bg3.wiki/w/images/1/1b/Portrait_Astarion.png"
                />
                <Figure
                    name="Ilma Suci Sunati Julita Gusdinika"
                    job="as Frontend Developer"
                    src="https://bg3.wiki/w/images/1/14/Edward-vanderghote-shadowheart.jpg"
                />
                <Figure
                    name="Hamdika Hidayat Muslim"
                    job="as Frontend Developer"
                    src="https://bg3.wiki/w/images/1/11/Portrait_Gale.png"
                />
            </div>
        </div>
    );
}
