export const messages = {
    app: {
        title: 'License Chooser',
        'page-title': 'Chooser'
    },
    header: {
        'nav-feedback': 'FEEDBACK'
    },
    'locale-selector.label': 'Selected language',
    chooser: {
        heading: 'LICENSE CHOOSER',
        instructions: 'Follow the steps to select the appropriate license for your work. ' +
            'This site does not store any information.'
    },
    stepper: {
        nav: {
            'previous-label': 'BACK',
            'next-label': 'NEXT',
            'done-label': 'DONE',
            'restart-label': 'Start again'
        },
        yes: 'Yes. ',
        no: 'No. ',
        'disabled-text': 'This step is disabled due to selecting waiver of copyright through use of CC0.',
        'disabled-text-ND': 'This step is disabled due to selecting ND, which does not allow for adaptations.',
        FS: {
            heading: 'License Expertise',
            question: 'Do you know which license you need?',
            selected: 'I know the license I need.',
            'not-selected': 'I need help selecting a license.'
        },
        BY: {
            heading: 'Attribution',
            question: 'Do you want attribution for your work?',
            selected: 'Anyone using my work must include proper attribution.',
            'not-selected': 'Anyone can use my work, even without giving me attribution.'
        },
        NC: {
            heading: 'Commercial Use',
            question: 'Do you want to allow others to use your work commercially?',
            selected: 'Others can use my work, even for commercial purposes.',
            'not-selected': 'Others can not use my work for commercial purposes.'
        },
        ND: {
            heading: 'Derivative Works',
            question: 'Do you want to allow others to remix, adapt, or build upon your work?',
            selected: 'Others can remix, adapt, or build upon my work.',
            'not-selected': 'Others may only use my work in unadapted form.'
        },
        SA: {
            heading: 'Sharing Requirements',
            question: 'Do you want to allow others to share adaptations of your work under any terms?',
            selected: 'Others can share adaptations of my work under any terms.',
            'not-selected': 'Others must use the same CC license if they adapt my work.'
        },
        CW: {
            heading: 'Copyright Waiver',
            question: 'Waive Your Copyright',
            selected: 'I waived copyright',
            'copyright-waive-agreement':
                'I hereby waive all copyright and related or neighboring rights ' +
                'together with all associated claims and causes of action with respect ' +
                'to this work to the extent possible under the law.',
            'copyright-waive-confirmation':
                'I have read and understand the terms and intended legal effect of CC0, ' +
                'and hereby voluntarily elect to apply it to this work.'
        },
        DD: {
            heading: 'Creative Commons License',
            question: 'Which license do you need?',
            placeholder: 'Creative Commons License'
        },
        AD: {
            heading: 'Attribution Details',
            instructions: 'Filling out this form is optional, but helps others attribute ' +
                'your work to you, and fills in machine-readable code.',
            form: {
                'creator-name': {
                    label: 'Creator of Work',
                    placeholder: 'Jane Doe'
                },
                'creator-profile': {
                    label: 'Link to Creator Profile',
                    placeholder: 'https://janedoe.com'
                },
                'work-title': {
                    label: 'Title of Work',
                    placeholder: 'This work'
                },
                'work-url': {
                    label: 'Link to Work',
                    placeholder: 'https://janedoe.com/best-photo-ever.jpg'
                }
            }
        }
    },
    'license-details-card': {
        heading: 'RECOMMENDED LICENSE',
        'heading-cc0': 'RECOMMENDED',
        'full-description': {
            cc0: 'By marking your work with a CC0 public domain dedication, you are giving up ' +
                'your copyright and allowing reusers to distribute, remix, adapt, and ' +
                'build upon the material in any medium or format, even for commercial purposes.',
            'cc-by': 'This license requires that reusers give credit to the creator. ' +
                'It allows reusers to distribute, remix, adapt, and build upon the material ' +
                'in any medium or format, even for commercial purposes.',
            'cc-by-sa': 'This license requires that reusers give credit to the creator. ' +
                'It allows reusers to distribute, remix, adapt, and build upon the material ' +
                'in any medium or format, even for commercial purposes. If others remix, adapt, ' +
                'or build upon the material, they must license the modified material under identical terms. ',
            'cc-by-nd': 'This license requires that reusers give credit to the creator. ' +
                'It allows reusers to copy and distribute the material in any medium or format ' +
                'in unadapted form only, even for commercial purposes. ',
            'cc-by-nc': 'This license requires that reusers give credit to the creator. ' +
                'It allows reusers to distribute, remix, adapt, and build upon the material ' +
                'in any medium or format, for noncommercial purposes only.',
            'cc-by-nc-sa': 'This license requires that reusers give credit to the creator. ' +
                'It allows reusers to distribute, remix, adapt, and build upon the material ' +
                'in any medium or format, for noncommercial purposes only. If others modify ' +
                'or adapt the material, they must license the modified material under identical terms.',
            'cc-by-nc-nd': 'This license requires that reusers give credit to the creator. ' +
                'It allows reusers to copy and distribute the material in any medium or format, ' +
                'for noncommercial purposes only. If others remix, adapt, or build upon the material, ' +
                'they may not distribute the modified material.'
        },
        'item-description': {
            zero: 'This work has been marked as dedicated to the public domain.',
            by: 'Credit must be given to you, the creator.',
            nc: 'Only noncommercial use of your work is permitted.',
            nd: 'No derivatives or adaptations of your work are permitted.',
            sa: 'Adaptations must be shared under the same terms.'
        },
        caption: {
            nc: 'Noncommercial means not primarily intended for or directed towards ' +
                'commercial advantage or monetary compensation.'
        }
    },
    'license-use': {
        heading: 'Mark your work',
        'common-instructions': 'Choose the kind of work to get appropriate license code or public domain marking.',
        'web-instructions': 'If you are licensing or marking one work, ' +
            'paste the code next to it. If you are licensing or marking the whole page or blog, ' +
            'you can paste the code at the bottom of the page.',
        'web-tab-heading': 'Website',
        'print-media-tab-heading': 'Print Work or Media',
        'print-media-instructions': 'Copy the text below and paste it on the title ' +
            'and/or copyright page of your print work or presentation, or in the credits of your media.',
        'rich-text-label': 'Rich Text',
        'html-label': 'HTML',
        'plain-text-label': 'Plain Text',
        'xmp-label': 'Download meta data XMP',
        'copy-label': 'Copy',
        'copied-label': 'Copied!',
        richtext: {
            'full-text': '{workTitle} {by} {creator}{licenseMark} {license}{print-instructions}',
            workTitle: 'This work',
            by: 'by',
            'licensed-text': 'is licensed under',
            'marked-text': 'is marked with',
            'print-instructions': '. To view a copy of this license, visit {linkToLicenseDeed}'
        },
        print: {
            text: ' To view a copy of this license, visit {linkToLicenseDeed}'
        }
    },
    help: {
        heading: 'CONFUSED? NEED HELP?',
        'what-are-cc-licenses': {
            heading: 'What Are Creative Commons Licenses?',
            text: 'Creative Commons legal tools give everyone from individual creators ' +
                'to large companies a simple, standardized way to grant copyright permissions ' +
                'to their creative work. They are designed to forge a balance inside ' +
                'the traditional "all rights reserved" setting that copyright law creates.',
            footer: 'For more information, please see [About the Licenses](https://creativecommons.org/licenses/).'
        },
        'how-licenses-work': {
            heading: 'How do the Licenses Work?',
            text: 'There are six different Creative Commons licenses, as well as one public domain ' +
                'dedication tool. Creators choose the option that is right for them, and then apply ' +
                'that license to their copyrighted work. Anyone who wants to reuse the work of the ' +
                'creator in a manner that requires permission under copyright must comply with ' +
                'the terms of the license.',
            footer: 'For more information, please see [About the Licenses](https://creativecommons.org/licenses/)'
        },
        'what-icons-mean': {
            heading: 'What do the Icons Mean?',
            text: 'The icons represent key features of the different CC license options:',
            BY: {
                text: 'Credit must be given to you, the creator.',
                'long-name': 'Attribution Required',
                'icon-alt-text': 'Attribution Required Icon',
                'short-name': '(BY)'
            },
            ND: {
                text: 'No derivatives or adaptations of your work are permitted.',
                'long-name': 'Modifying Not Allowed',
                'icon-alt-text': 'Modifying Not Allowed Icon',
                'short-name': '(ND/ NoDerivatives)'
            },
            NC: {
                text: 'Only noncommercial use of your work is permitted.',
                'long-name': 'Commercial Use Not Allowed',
                'icon-alt-text': 'Commercial Use Not Allowed Icon',
                'short-name': '(NC/ NonCommercial)'
            },
            SA: {
                text: 'Adaptations must be shared under the same terms.',
                'long-name': 'Distributed on Same Terms',
                'icon-alt-text': 'Distributed on Same Terms Icon',
                'short-name': '(SA/ ShareAlike)'
            },
            footer: ''
        },
        'how-licenses-communicated': {
            heading: 'How are Licenses Communicated?',
            text: 'Creative Commons licenses can be represented by their names, their associated icons,' +
                'or both. For example, a CC BY-NC license, which requires attribution, and prohibits ' +
                'commercial use could be represented by its:',
            'full-name': 'Full Name',
            'short-name': 'Short Name',
            'license-icons': 'Icons',
            'CC-BY-NC': 'Attribution-NonCommercial 4.0 International',
            footer: ''
        },
        'considerations-before-licensing': {
            heading: 'Considerations Before Licensing',
            text: 'There are a number of things you should consider before you apply a ' +
                'Creative Commons license to your work, or before using Creative Commons-licenced material.' +
                '\n\n' +
                '[Considerations for Licensors](https://wiki.creativecommons.org/wiki/Considerations_for_licensors_and_licensees#Considerations_for_licensors) ' +
                '- If you are licensing your own work ' +
                '\n\n' +
                '[Considerations for Licensees](https://wiki.creativecommons.org/wiki/Considerations_for_licensors_and_licensees#Considerations_for_licensees)' +
                "- someone else's licensed work",
            footer: "For more information, please see [the CC wiki's page on Considerations for Licensors and Licensees](https://wiki.creativecommons.org/wiki/Before_Licensing)."
        },
        'how-formally-license': {
            heading: 'How do I Formally License my Work?',
            text: 'Licensing your work is as simple as marking it under the specific license you choose. ' +
                'This marking can be as simple as a bit of text stating the license in a copyright notice, ' +
                'or as complex as embedding the license information on your website using the HTML code ' +
                'associated with the particular license. We strongly recommend at least including a link ' +
                'to the applicable license.',
            footer: ''
        },
        'six-cc-licenses': {
            heading: 'The Six Creative Commons Licenses',
            text: 'There are six main licenses that Creative Commons offers.' +
                '\n\n' +
                'In the diagram to the right, you can see the six main licenses and the public ' +
                'domain CC0 license, and how restrictive they are, with licenses at the top being ' +
                'the least restrictive, and licenses at the bottom being the most restrictive.' +
                '\n\n' +
                'If you are unsure about which one is right for you and your work, please select ' +
                '**I need help selecting a license** on the first question of this page.',
            footer: 'For more information, please read more about ' +
                '[CC Licenses and Examples](https://creativecommons.org/share-your-work/licensing-types-examples/).'
        },
        'what-free-culture-license': {
            heading: 'What is a Free Culture License?',
            text: 'CC uses the definition of free cultural works at ' +
                '[Freedom Defined](https://freedomdefined.org/Definition) to categorize certain ' +
                'CC licenses as Free Culture Licenses. Freedom Defined is an open organization of ' +
                'free culture advocates and researchers; the definition was developed by its community ' +
                'as a parallel to efforts such as the Free Software Definition, to have a standard for ' +
                'defining Free Culture. Using that definition, material licensed under CC BY or BY-SA ' +
                'is a free cultural work, as is anything in the worldwide public domain marked with CC0 ' +
                'or the Public Domain Mark.',
            footer: 'Read more about ' +
                '[Understanding Free Cultural Works](https://creativecommons.org/share-your-work/public-domain/freeworks)'
        },
        'look-earlier-license-ver': {
            heading: 'Looking for Earlier License Versions, including Ports?',
            text: 'The most recent license version is 4.0, which can be used internationally. ' +
                'Earlier versions of licenses, including 3.0 international and ports localized ' +
                'to particular jurisdictions, can still be used on the legacy version of the ' +
                '[License Chooser](https://creativecommons.org/choose/)' +
                '\n\n' +
                'Click on the link at the top of the page **"Looking for earlier license versions,' +
                'including ports?"** and follow the prompts to use earlier license versions.',
            footer: ''
        }
    },
    alt: {
        'free-works-icon': 'Free Works Icon',
        'non-free-works-icon': 'Icon for a non-Free Works License',
        'cc-logo': 'Creative Commons'
    },
    footer: {
        donation: {
            header: 'OUR WORK RELIES ON YOU!',
            call: 'Help us keep Internet free and open.'
        },
        licensing: {
            text: "Except where otherwise <a href='https://creativecommons.org/policies#license'>noted</a>," +
                "content on this site is licensed under a <a href='https://creativecommons.org/licenses/by/4.0/'>" +
                'Creative Commons Attribution 4.0 International license</a>. Icons by ' +
                "<a href='https://creativecommons.org/website-icons'>Noun Project</a>."
        },
        contribute: "Contribute on <a href='https://github.com/creativecommons/chooser'>Github</a>."
    },
    'cc0-waiver': {
        text: "Creative Commons Legal Code\n CC0 1.0 Universal\n Official translations of this legal tool are available\n CREATIVE COMMONS CORPORATION IS NOT A LAW FIRM AND DOES NOT PROVIDE LEGAL SERVICES. DISTRIBUTION OF THIS DOCUMENT DOES NOT CREATE AN ATTORNEY-CLIENT RELATIONSHIP. CREATIVE COMMONS PROVIDES THIS INFORMATION ON AN 'AS-IS' BASIS. CREATIVE COMMONS MAKES NO WARRANTIES REGARDING THE USE OF THIS DOCUMENT OR THE INFORMATION OR WORKS PROVIDED HEREUNDER, AND DISCLAIMS LIABILITY FOR DAMAGES RESULTING FROM THE USE OF THIS DOCUMENT OR THE INFORMATION OR WORKS PROVIDED HEREUNDER.\n Statement of Purpose\n  The laws of most jurisdictions throughout the world automatically confer exclusive Copyright and Related Rights (defined below) upon the creator and subsequent owner(s) (each and all, an 'owner') of an original work of authorship and/or a database (each, a 'Work').\nCertain owners wish to permanently relinquish those rights to a Work for the purpose of contributing to a commons of creative, cultural and scientific works ('Commons') that the public can reliably and without fear of later claims of infringement build upon, modify, incorporate in other works, reuse and redistribute as freely as possible in any form whatsoever and for any purposes, including without limitation commercial purposes. These owners may contribute to the Commons to promote the ideal of a free culture and the further production of creative, cultural and scientific works, or to gain reputation or greater distribution for their Work in part through the use and efforts of others.\nFor these and/or other purposes and motivations, and without any expectation of additional consideration or compensation, the person associating CC0 with a Work (the 'Affirmer'), to the extent that he or she is an owner of Copyright and Related Rights in the Work, voluntarily elects to apply CC0 to the Work and publicly distribute the Work under its terms, with knowledge of his or her Copyright and Related Rights in the Work and the meaning and intended legal effect of CC0 on those rights.\n  1. Copyright and Related Rights. A Work made available under CC0 may be protected by copyright and related or neighboring rights ('Copyright and Related Rights'). Copyright and Related Rights include, but are not limited to, the following:\n the right to reproduce, adapt, distribute, perform, display, communicate, and translate a Work;\n moral rights retained by the original author(s) and/or performer(s);  publicity and privacy rights pertaining to a person's image or likeness depicted in a Work;\n rights protecting against unfair competition in regards to a Work, subject to the limitations in paragraph 4(a), below;\n  rights protecting the extraction, dissemination, use and reuse of data in a Work;\n database rights (such as those arising under Directive 96/9/EC of the European Parliament and of the Council of 11 March 1996 on the legal protection of databases, and under any national implementation thereof, including any amended or successor version of such directive); and other similar, equivalent or corresponding rights throughout the world based on applicable law or treaty, and any national implementations thereof.\n 2. Waiver. To the greatest extent permitted by, but not in contravention of, applicable law, Affirmer hereby overtly, fully, permanently, irrevocably and unconditionally waives, abandons, and surrenders all of Affirmer's Copyright and Related Rights and associated claims and causes of action, whether now known or unknown (including existing as well as future claims and causes of action), in the Work (i) in all territories worldwide, (ii) for the maximum duration provided by applicable law or treaty (including future time extensions), (iii) in any current or future medium and for any number of copies, and (iv) for any purpose whatsoever, including without limitation commercial, advertising or promotional purposes (the 'Waiver'). Affirmer makes the Waiver for the benefit of each member of the public at large and to the detriment of Affirmer's heirs and successors, fully intending that such Waiver shall not be subject to revocation, rescission, cancellation, termination, or any other legal or equitable action to disrupt the quiet enjoyment of the Work by the public as contemplated by Affirmer's express Statement of Purpose.\n 3. Public License Fallback. Should any part of the Waiver for any reason be judged legally invalid or ineffective under applicable law, then the Waiver shall be preserved to the maximum extent permitted taking into account Affirmer's express Statement of Purpose. In addition, to the extent the Waiver is so judged Affirmer hereby grants to each affected person a royalty-free, non transferable, non sublicensable, non exclusive, irrevocable and unconditional license to exercise Affirmer's Copyright and Related Rights in the Work (i) in all territories worldwide, (ii) for the maximum duration provided by applicable law or treaty (including future time extensions), (iii) in any current or future medium and for any number of copies, and (iv) for any purpose whatsoever, including without limitation commercial, advertising or promotional purposes (the 'License'). The License shall be deemed effective as of the date CC0 was applied by Affirmer to the Work. Should any part of the License for any reason be judged legally invalid or ineffective under applicable law, such partial invalidity or ineffectiveness shall not invalidate the remainder of the License, and in such case Affirmer hereby affirms that he or she will not (i) exercise any of his or her remaining Copyright and Related Rights in the Work or (ii) assert any associated claims and causes of action with respect to the Work, in either case contrary to Affirmer's express Statement of Purpose.\n 4. Limitations and Disclaimers.\n No trademark or patent rights held by Affirmer are waived, abandoned, surrendered, licensed or otherwise affected by this document.\n Affirmer offers the Work as-is and makes no representations or warranties of any kind concerning the Work, express, implied, statutory or otherwise, including without limitation warranties of title, merchantability, fitness for a particular purpose, non infringement, or the absence of latent or other defects, accuracy, or the present or absence of errors, whether or not discoverable, all to the greatest extent permissible under applicable law.\n Affirmer disclaims responsibility for clearing rights of other persons that may apply to the Work or any use thereof, including without limitation any person's Copyright and Related Rights in the Work. Further, Affirmer disclaims responsibility for obtaining any necessary consents, permissions or other rights required for any use of the Work.\n Affirmer understands and acknowledges that Creative Commons is not a party to this document and has no duty or obligation with respect to this CC0 or use of the Work."
    },
    'free-culture-work': {
        yes: 'Free Culture License',
        no: 'Not a Free Culture License'
    }
}
