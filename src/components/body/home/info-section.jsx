import { lazy, Suspense } from "react"
import dynamicIconImports from "lucide-react/dynamicIconImports"

function Icon({ name, ...props }) {
    const LucideIcon = lazy(dynamicIconImports[name])
    const fallback = <div style={{ background: '#ddd', width: 30, height: 30 }} />

    return (
        <Suspense fallback={fallback}>
            <LucideIcon {...props} />
        </Suspense>
    )
}

function InfoItem({ text, alt, icon, color }) {
    return (
        <div className="p-5 border border-white/20 bg-white/10 hover:bg-white/20 rounded-lg shadow-lg hover:shadow-sm transition duration-300">
            <div className="flex flex-col gap-2">
                <div className="justify-center mx-auto text-center">
                    <Icon name={icon} size={48} color={color}/>
                </div>
                <div className="text-xl font-bold">
                    {text}
                </div>
                <p className="text-sm">{alt}</p>
            </div>
        </div>
    )
}

function InfoSection({ items }) {

    return (
        <div className="w-full mt-5 sm:mt-10 md:mt-16">
            <div className="p-5 mx-auto justify-center text-center">
                <div className="grid sm:grid-cols-2 gap-3">
                    {items.map((item) => (
                        <InfoItem 
                            text={item.text}
                            icon={item.icon}
                            color={item.color}
                            alt={item.alt}
                            key={item.text}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default InfoSection