import { useStore } from '../store/store';
import useInView from '../hooks/useInView';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { LuLeaf } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { GoGlobe } from "react-icons/go";
import { FiAward } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { LuPhone } from "react-icons/lu";
import { LuMapPin } from "react-icons/lu";
import { FiClock } from "react-icons/fi";

export default function About(){
    const { theme, lang } = useStore();
    
    const { ref: aboutRef, inView: aboutInView } = useInView();
    const { ref: philosophyAndCraftsmanshipRef, inView: philosophyAndCraftsmanshipInView } = useInView();
    const { ref: statsRef, inView: statsInView } = useInView();
    const { ref: teamRef, inView: teamInView } = useInView();
    const { ref: commitmentRef, inView: commitmentInView } = useInView();
    const { ref: journeyRef, inView: journeyInView } = useInView();
    const { ref: faqsRef, inView: faqsInView } = useInView();
    const { ref: getInTouchRef, inView: getInTouchInView } = useInView();


    const values = [
        { icon: <LuLeaf size={25} className='text-[#ce8a3e]' />, titleEn: "Sustainability", titleKa: "მდგრადობა", descEn: "100% recycled packaging and carbon-neutral shipping on every order.", descKa: "100%-ით გადამუშავებული შეფუთვა და ნახშირბად-ნეიტრალური მიწოდება ყველა შეკვეთაზე." },
        { icon: <FaRegHeart size={25} className='text-[#ce8a3e]' />, titleEn: "Ethical Production", titleKa: "ეთიკური წარმოება", descEn: "Fair wages and safe conditions across our entire supply chain.", descKa: "სამართლიანი ხელფასები და უსაფრთხო პირობები ჩვენი მიწოდების მთელი ჯაჭვის განმავლობაში." },
        { icon: <GoGlobe size={25} className='text-[#ce8a3e]' />, titleEn: "Global Sourcing", titleKa: "გლობალური სორსინგი", descEn: "Premium materials from the world's most respected mills and tanneries.", descKa: "პრემიუმ მასალები მსოფლიოს ყველაზე პატივცემული ქარხნებისა და სათევზაო ქარხნებისგან." },
        { icon: <FiAward size={25} className='text-[#ce8a3e]' />, titleEn: "Quality First", titleKa: "ხარისხი პირველ რიგში", descEn: "Every piece is built to last, backed by our 2-year guarantee.", descKa: "თითოეული ნივთი გამძლეა, რასაც ჩვენი 2-წლიანი გარანტია უზრუნველყოფს." }
    ];

    const team = [
        { initials: 'ÉD', name: 'Élise Dubois', roleEn: 'Creative Director', roleKa: 'კრეატიული დირექტორი', bioEn: 'Former Hermès designer with 15 years of haute couture experience.', bioKa: 'Hermès-ის ყოფილი დიზაინერი მაღალი მოდის სფეროში 15 წლიანი გამოცდილებით.' },
        { initials: 'MB', name: 'Marco Bellini', roleEn: 'Head of Production', roleKa: 'წარმოების უფროსი', bioEn: 'Oversees our atelier network across Italy, Portugal, and Japan.', bioKa: 'ზედამხედველობს ჩვენს სახელოსნოების ქსელს იტალიაში, პორტუგალიასა და იაპონიაში.' },
        { initials: 'AP', name: 'Anya Petrov', roleEn: 'Sustainability Lead', roleKa: 'მდგრადობის წამყვანი', bioEn: 'Drives our carbon-neutral initiatives and ethical sourcing programs.', bioKa: 'ხელს უწყობს ჩვენს ნახშირბად-ნეიტრალურ ინიციატივებსა და ეთიკური მომარაგების პროგრამებს.' },
        { initials: 'TH', name: 'Thomas Hartmann', roleEn: 'Chief of Operations', roleKa: 'ოპერაციების უფროსი', bioEn: 'Ensures seamless logistics from workshop to your wardrobe.', bioKa: 'უზრუნველყოფს შეუფერხებელ ლოჯისტიკას სახელოსნოდან თქვენს გარდერობამდე.' }
    ];

    const journey = [
        { year: 2020, textEn: 'MAISON founded in Paris with a 6-piece capsule collection.', textKa: 'MAISON პარიზში დაარსდა 6 ნივთისგან შემდგარი კაფსულური კოლექციით.' },
        { year: 2021, textEn: 'Opened our first atelier in Florence, Italy.', textKa: 'ჩვენი პირველი სახელოსნო იტალიის ქალაქ ფლორენციაში გავხსენით.' },
        { year: 2022, textEn: 'Expanded to 24 countries with 50+ artisan partners worldwide.', textKa: 'გაფართოვდა 24 ქვეყანაში 50-ზე მეტი ხელოსანი პარტნიორით მთელი მსოფლიოს მასშტაბით.' },
        { year: 2023, textEn: 'Reached 10,000 customers and launched knitwear line.', textKa: 'მიაღწია 10 000 მომხმარებელს და გამოუშვა ნაქსოვი ტანსაცმლის ხაზი.' },
        { year: 2024, textEn: 'Launched carbon-neutral shipping and recycled packaging initiative.', textKa: 'დაიწყო ნახშირბად-ნეიტრალური გადაზიდვებისა და გადამუშავებული შეფუთვის ინიციატივა.' },
        { year: 2025, textEn: 'ntroduced footwear collection and accessories line.', textKa: 'წარმოგიდგენთ ფეხსაცმლის კოლექციას და აქსესუარების ხაზს.' },
        { year: 2026, textEn: 'Spring/Summer collection features 100% sustainably sourced materials.', textKa: 'გაზაფხული/ზაფხულის კოლექცია 100%-ით მდგრადი წყაროებიდან მოპოვებული მასალებისგან შედგება.' }
    ]

    const faqs = [
        { questionEn: 'Where are your products made?', questionKa: 'სად იწარმოება თქვენი პროდუქცია?', answerEn: 'Our garments are crafted in small ateliers in Italy, Portugal, and Japan by skilled artisans with decades of experience.', answerKa: 'ჩვენი ტანსაცმელი იწარმოება იტალიის, პორტუგალიისა და იაპონიის პატარა სახელოსნოებში, ათწლეულების გამოცდილების მქონე გამოცდილი ხელოსნების მიერ.' },
        { questionEn: 'What is your return policy?', questionKa: 'როგორია თქვენი დაბრუნების პოლიტიკა?', answerEn: 'We offer 30-day free returns and exchanges on all unworn items. Simply contact our support team to initiate a return.', answerKa: 'ჩვენ გთავაზობთ 30-დღიან უფასო დაბრუნებას და გაცვლას ყველა გამოუყენებელ ნივთზე. დაბრუნების დასაწყებად უბრალოდ დაუკავშირდით ჩვენს დახმარების გუნდს.' },
        { questionEn: 'Do you ship internationally?',questionKa: 'საერთაშორისო დონეზე აგზავნით?', answerEn: 'Yes, we ship to over 24 countries worldwide. Orders over $300 qualify for free international shipping.', answerKa: 'დიახ, ჩვენ ვაგზავნით მსოფლიოს 24-ზე მეტ ქვეყანაში. 300 დოლარზე მეტი შეკვეთის შემთხვევაში, საერთაშორისო მიწოდება უფასოა.' },
        { questionEn: 'How do I care for my garments?',questionKa: 'როგორ მოვუარო ჩემს ტანსაცმელს?', answerEn: 'Each product comes with specific care instructions. Generally, we recommend dry cleaning for structured pieces and gentle hand-washing for knitwear.', answerKa: 'თითოეულ პროდუქტს მოყვება მოვლის კონკრეტული ინსტრუქციები. ზოგადად, სტრუქტურირებული ტანსაცმლისთვის რეკომენდებულია ქიმწმენდა, ხოლო ნაქსოვი ტანსაცმლისთვის - ნაზად ხელით რეცხვა.' }
    ];

    return (
        <div className={`${theme === 'light' ? 'bg-[#f9f7f5]' : 'bg-[#171311]'} min-h-screen transition-all duration-200`}>
            <NavBar page='about' />
            <div className='flex justify-center flex-col px-120 py-30'>
                <div ref={aboutRef} className={`${aboutInView ? 'slide-in-bottom-animation' : 'opacity-0'}`}>
                    <p className='slide-in-bottom-animation text-[#988a7e] text-sm tracking-[7px]'>{lang === 'en' ? 'OUR STORY' : 'ჩვენი ისტორია'}</p>
                    <h1 className={`${theme === 'light' ? 'text-black' : 'text-white'} slide-in-bottom-animation font text-5xl mt-3`}>{lang === 'en' ? 'About MAISON' : 'MAISON-ის შესახებ'}</h1>
                    <p className= 'slide-in-bottom-animation text-[#988a7e] text-xl w-162 mt-6'>{lang === 'en' ? 'Founded in 2020, MAISON is a contemporary fashion house dedicated to creating timeless pieces that transcend seasonal trends. We believe style should be effortless, sustainable, and enduring.' : 'MAISON 2020 წელს დაარსებული თანამედროვე მოდის სახლია, რომელიც სეზონურ ტენდენციებს სცილდება და მარადიული ნივთების შექმნას ემსახურება. ჩვენ გვჯერა, რომ სტილი უნდა იყოს მარტივი, მდგრადი და გამძლე.'}</p>
                </div>
                <div ref={philosophyAndCraftsmanshipRef} className={`${philosophyAndCraftsmanshipInView ? 'slide-in-bottom-animation' : 'opacity-0'} flex justify-between mt-25`}>
                    <div>
                        <h3 className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-2xl`}>{lang === 'en' ? 'Our Philosophy' : 'ჩვენი ფილოსოფია'}</h3>
                        <p className='text-[#988a7e] text-lg w-105 mt-4'>{lang === 'en' ? 'We believe in the power of understated elegance. Every piece in our collection is designed with intention — to be worn, loved, and passed down. We source the finest materials from artisans around the world.' : 'ჩვენ გვჯერა თავშეკავებული ელეგანტურობის ძალის. ჩვენი კოლექციის ყველა ნივთი შექმნილია განზრახვით — რომ იყოს ნახმარი, საყვარელი და გადაცემული. ჩვენ ვიყენებთ საუკეთესო მასალებს მთელი მსოფლიოს ხელოსნებისგან.'}</p>
                        <p className='text-[#988a7e] text-lg w-100 mt-4'>{lang === 'en' ? 'Our approach to fashion is rooted in sustainability and quality over quantity. We create fewer pieces, but we make them better.' : 'მოდისადმი ჩვენი მიდგომა მდგრადობასა და რაოდენობაზე მეტად ხარისხზეა დაფუძნებული. ჩვენ ნაკლებ ნივთს ვქმნით, მაგრამ უკეთესს ვქმნით.'}</p>
                    </div>
                    <div>
                        <h3 className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-2xl`}>{lang === 'en' ? 'Craftsmanship' : 'ხელოსნობა'}</h3>
                        <p className='text-[#988a7e] text-lg w-101 mt-4'>{lang === 'en' ? "From Italian cashmere to Japanese selvedge denim, we partner with the world's most respected mills and tanneries. Our garments are constructed in small ateliers where skilled artisans bring decades of expertise." : "იტალიური ქაშმირიდან დაწყებული იაპონური ჯინსით დამთავრებული, ჩვენ ვთანამშრომლობთ მსოფლიოს ყველაზე პატივსაცემ ქარხნებთან და ტყავის საამქროებთან. ჩვენი ტანსაცმელი იკერება პატარა სახელოსნოებში, სადაც გამოცდილი ხელოსნები ათწლეულების განმავლობაში არსებულ გამოცდილებას იყენებენ."}</p>
                        <p className='text-[#988a7e] text-lg w-100 mt-4'>{lang === 'en' ? "We're committed to ethical production practices and full supply chain transparency." : "ჩვენ ერთგულნი ვართ ეთიკური წარმოების პრაქტიკისა და მიწოდების ჯაჭვის სრული გამჭვირვალობის."}</p>
                    </div>
                </div>
                <div className='flex justify-between items-center mt-25'>
                    {values.map((el, i) => (
                        <div 
                            key={i}
                            className={`
                                ${theme === 'light' ? 'bg-[#fdfcfc] border-[#e5e0dc]' : 'bg-[#221d1b] border-[#38312e]'}
                                slide-in-bottom-animation w-50 h-45 px-5 flex justify-center items-center flex-col gap-1 text-center border rounded
                            `}
                            style={{ animationDelay: `${i * 100}ms` }}
                            >
                            {el.icon}
                            <h6 
                                className={`
                                    ${lang === 'en' ? 'text-lg' : 'text-sm'}
                                    ${theme === 'light' ? 'text-black' : 'text-white'} 
                                    font font-medium
                                `}>{lang === 'en' ? el.titleEn : el.titleKa}</h6>
                            <p className={`${lang === 'en' ? 'text-sm' : 'text-xs'} text-[#988a7e]`}>{lang === 'en' ? el.descEn : el.descKa}</p>
                        </div>
                    ))}
                </div>
                <div ref={statsRef} className={`${statsInView ? 'slide-in-bottom-animation' : 'opacity-0'} flex justify-between items-center mt-25`}>
                    <div className='flex justify-center items-center flex-col'>
                        <p className='font text-3xl font-semibold text-[#ce8a3e] px-20'>24+</p>
                        <p className='text-[#988a7e] text-center w-35'>{lang === 'en' ? 'Countries' : 'ქვეყნები'}</p>
                    </div>
                    <div className='flex justify-center items-center flex-col'>
                        <p className='font text-3xl font-semibold text-[#ce8a3e] px-20'>50+</p>
                        <p className='text-[#988a7e] text-center w-35'>{lang === 'en' ? 'Artisan Partners' : 'ხელოსანი პარტნიორები'}</p>
                    </div>
                    <div className='flex justify-center items-center flex-col'>
                        <p className='font text-3xl font-semibold text-[#ce8a3e] px-20'>200+</p>
                        <p className='text-[#988a7e] text-center w-35'>{lang === 'en' ? 'Products Crafted' : 'შემუშავებული პროდუქტები'}</p>
                    </div>
                    <div className='flex justify-center items-center flex-col'>
                        <p className='font text-3xl font-semibold text-[#ce8a3e] px-20'>15K+</p>
                        <p className='text-[#988a7e] text-center w-35'>{lang === 'en' ? 'Happy Customers' : 'ბედნიერი მომხმარებლები'}</p>
                    </div>
                </div>
                <div className='flex justify-center items-center flex-col mt-25'>
                    <h3 className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-2xl`}>{lang === 'en' ? 'Meet the Team' : 'გაიცანით გუნდი'}</h3>
                    <div ref={teamRef} className='flex justify-between items-center mt-7 w-full'>
                        {team.map((el, i) => (
                            <div 
                                key={i}
                                className={`
                                    ${teamInView ? 'slide-in-bottom-animation' : 'opacity-0'}
                                    ${theme === 'light' ? 'bg-[#fdfcfc] border-[#e5e0dc]' : 'bg-[#221d1b] border-[#38312e]'}
                                    flex justify-center items-center text-center flex-col border rounded w-50 h-55 p-3
                                `}
                                style={{ animationDelay: `${i * 100}ms` }}
                                >
                                <span className={`${theme === 'light' ? 'bg-[#eeebe8]' : 'bg-[#322c29]'} font font-semibold text-xl text-[#ce8a3e] w-15 h-15 rounded-full flex justify-center items-center`}>{el.initials}</span>
                                <h6 className={`${theme === 'light' ? 'text-black' : 'text-white'} font mt-3`}>{el.name}</h6>
                                <p className='uppercase text-xs text-[#ce8a3e]'>{lang === 'en' ? el.roleEn : el.roleKa}</p>
                                <p className={`${lang === 'en' ? 'text-sm' : 'text-xs'} text-[#988a7e] mt-3`}>{lang === 'en' ? el.bioEn : el.bioKa}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    ref={commitmentRef}
                    className={`
                        ${commitmentInView ? 'slide-in-bottom-animation' : 'opacity-0'}
                        ${theme === 'light' ? 'bg-[#fdfcfc] border-[#e5e0dc]' : 'bg-[#221d1b] border-[#38312e]'}
                        mt-25 flex justify-center items-center flex-col text-center px-20 py-10 border rounded
                    `}
                    >
                    <h3 className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-2xl`}>{lang === 'en' ? 'Our Commitment' : 'ჩვენი ვალდებულება'}</h3>
                    <p className='mt-5 text-[#988a7e] text-lg w-175'>{lang === 'en' ? "At MAISON, sustainability isn't a buzzword — it's our foundation. We use recycled packaging, carbon-neutral shipping, and partner exclusively with factories that uphold fair labor standards. By 2027, we aim to make 100% of our materials either organic, recycled, or responsibly sourced." : "MAISON-ში მდგრადობა არ არის პოპულარული სიტყვა — ეს ჩვენი საფუძველია. ჩვენ ვიყენებთ გადამუშავებულ შეფუთვას, ნახშირბად-ნეიტრალურ მიწოდებას და ვთანამშრომლობთ ექსკლუზიურად იმ ქარხნებთან, რომლებიც იცავენ სამართლიან შრომის სტანდარტებს. 2027 წლისთვის ჩვენი მიზანია, ჩვენი მასალების 100% ორგანული, გადამუშავებული ან პასუხისმგებლიანი წყაროებიდან იყოს მიღებული."}</p>
                </div>
                <div className='flex justify-center items-center flex-col mt-30'>
                    <h3 className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-3xl`}>{lang === 'en' ? 'Our Journey' : 'ჩვენი მოგზაურობა'}</h3>
                    <div ref={journeyRef} className='flex flex-col gap-7 mt-10'>
                        {journey.map((el, i) => (
                            <div key={i} className={`${journeyInView ? 'slide-in-bottom-animation' : 'opacity-0'} flex justify-start items-center`} style={{ animationDelay: `${i * 50}ms` }}>
                                <span className='text-lg font-medium text-[#ce8a3e]'>{el.year}</span>
                                <p className={`${lang === 'en' ? 'w-130' : 'w-150'} text-lg text-[#988a7e] pl-5 ml-5 border-l`}>{lang === 'en' ? el.textEn : el.textKa}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex justify-center items-center flex-col mt-30'>
                    <h3 className={`${theme === 'light' ? 'text-black' : 'text-white'} font text-3xl`}>{lang === 'en' ? 'Frequently Asked Questions' : 'ხშირად დასმული კითხვები'}</h3>
                    <div ref={faqsRef} className='flex justify-center items-center flex-col gap-5 mt-10'>
                        {faqs.map((el, i) => (
                            <div
                                key={i} 
                                className={`
                                    ${faqsInView ? 'slide-in-bottom-animation' : 'opacity-0'}
                                    ${theme === 'light' ? 'bg-[#fdfcfc] border-[#e5e0dc]' : 'bg-[#221d1b] border-[#38312e]'} 
                                    w-160 p-5 border rounded
                                `}
                                style={{ animationDelay: `${i * 50}ms` }}
                                >
                                    <p className={`${theme === 'light' ? 'text-black' : 'text-white'} font font-semibold`}>{lang === 'en' ? el.questionEn : el.questionKa}</p>
                                    <p className='text-sm text-[#988a7e]'>{lang === 'en' ? el.answerEn : el.answerKa}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    ref={getInTouchRef}
                    className={`
                        ${getInTouchInView ? 'slide-in-bottom-animation' : 'opacity-0'}
                        ${theme === 'light' ? 'bg-[#1c1917]' : 'bg-[#eeebe8]'} 
                        flex justify-center items-center flex-col mt-30 mx-20 py-12 rounded
                    `}
                    >
                        <h3 className={`${theme === 'light' ? 'text-white' : 'text-black'} font text-3xl`}>{lang === 'en' ? 'Get in Touch' : 'დაგვიკავშირდით'}</h3>
                        <div className='flex justify-between items-center mt-7 w-full px-15'>
                            <div className='flex justify-center items-center flex-col gap-1'>
                                <CiMail size={22} className={`${theme === 'light' ? 'text-[#b7b5b3]' : 'text-[#575351]'}`} />
                                <p className={`${theme === 'light' ? 'text-white' : 'text-black'} font-medium`}>{lang === 'en' ? 'Email' : 'ელ. ფოსტა'}</p>
                                <p className={`${theme === 'light' ? 'text-[#b7b5b3]' : 'text-[#575351]'} text-xs`}>hello@maison.com</p>
                            </div>
                            <div className='flex justify-center items-center flex-col gap-1'>
                                <LuPhone size={22} className={`${theme === 'light' ? 'text-[#b7b5b3]' : 'text-[#575351]'}`} />
                                <p className={`${theme === 'light' ? 'text-white' : 'text-black'} font-medium`}>{lang === 'en' ? 'Phone' : 'ტელეფონი'}</p>
                                <p className={`${theme === 'light' ? 'text-[#b7b5b3]' : 'text-[#575351]'} text-xs`}>+33 1 42 86 87 88</p>
                            </div>
                            <div className='flex justify-center items-center flex-col gap-1'>
                                <LuMapPin size={22} className={`${theme === 'light' ? 'text-[#b7b5b3]' : 'text-[#575351]'}`} />
                                <p className={`${theme === 'light' ? 'text-white' : 'text-black'} font-medium`}>{lang === 'en' ? 'Address' : 'მისამართი'}</p>
                                <p className={`${theme === 'light' ? 'text-[#b7b5b3]' : 'text-[#575351]'} text-xs`}>12 Rue du Faubourg, Paris</p>
                            </div>
                            <div className='flex justify-center items-center flex-col gap-1'>
                                <FiClock size={22} className={`${theme === 'light' ? 'text-[#b7b5b3]' : 'text-[#575351]'}`} />
                                <p className={`${theme === 'light' ? 'text-white' : 'text-black'} font-medium`}>{lang === 'en' ? 'Hours' : 'სამუშაო საათები'}</p>
                                <p className={`${theme === 'light' ? 'text-[#b7b5b3]' : 'text-[#575351]'} text-xs`}>Mon-Sat, 10am-7pm CET</p>
                            </div>
                        </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}