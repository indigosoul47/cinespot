import { useState } from 'react';
import { Popover } from '@headlessui/react';
import { usePopper } from 'react-popper';

function Tooltip({children, message, content}) {
    let [referenceElement, setReferenceElement] = useState();
    let [popperElement, setPopperElement] = useState();
    let [isOpen, setIsOpen] = useState(false);
    let { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'top',
    });

    return (
        <Popover className="relative">
            <Popover.Button
                as="div"
                ref={setReferenceElement}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >{
                children
            }</Popover.Button>

            {
                isOpen && (
                    <Popover.Panel 
                        className="absolute z-10"
                        ref={setPopperElement}
                        style={styles.popper}
                        {...attributes.popper}
                        static>
                        <div className="bg-slate-700 p-4 text-white rounded mb-4 relative" style={{
                            fontFamily: 'JosefinSans, Arial, serif'
                        }}>
                            {content ?? <h1 className='w-max'>{message}</h1>}
                            <span className='' style={{
                                position: 'absolute',
                                content: '',
                                width: '0',
                                height: '0',
                                borderLeft: '5px solid transparent',
                                borderRight: '5px solid transparent',
                                borderTop: '7px solid rgb(51 65 85 / var(--tw-bg-opacity))',
                                bottom: '-5px',
                                transform: 'translate(50%, 0)',
                                right: '50%'
                            }}></span>
                        </div>

                    </Popover.Panel>
                )
            }
        </Popover>
    )
}
  
export default Tooltip;