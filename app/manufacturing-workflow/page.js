import React from "react";

// File: /Users/chandanpai/Documents/GitHub/portfolio/chandan-portfolio/app/manufacturing-workflow/page.js

export default function Page() {
    return (
        <main className="min-h-screen bg-gray-50 text-gray-900 px-6 py-10">
            {/* Hero */}
            <section className="max-w-6xl mx-auto mb-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                        <h1 className="text-3xl md:text-4xl font-semibold">
                            Boston Scientific Wolverine Blade Assembly Optimization
                        </h1>
                        <p className="mt-3 text-lg text-gray-600">
                            Lean methodology applied to medical device manufacturing
                        </p>
                        <p className="mt-6 text-sm text-gray-500">
                            Case study: analysis, recommendations and artifacts for reducing
                            motion waste, standardizing workflows, and improving safety &
                            quality in blade assembly.
                        </p>
                        <div className="mt-6">
                            <a
                                href="/"
                                className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700"
                            >
                                Back to homepage
                            </a>
                        </div>
                    </div>

                    <div className="w-full md:w-1/3">
                        <div className="h-48 bg-white border border-dashed border-gray-300 rounded-md flex items-center justify-center">
                            <span className="text-gray-400">Image placeholder: Wolverine device</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem */}
            <section className="max-w-6xl mx-auto mb-10 bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-medium mb-3">Problem</h2>
                <p className="text-gray-600">
                    Blade assembly showed motion waste, unclear workflows, and safety-critical
                    quality requirements. Operators performed repetitive tasks without
                    standardized metrics resulting in variability and rework.
                </p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-md p-4 flex flex-col items-center">
                        <div className="h-40 w-full bg-gray-50 border border-dashed border-gray-200 rounded-md flex items-center justify-center">
                            <span className="text-gray-400">Image placeholder: Blade station</span>
                        </div>
                        <p className="mt-3 text-sm text-gray-500">Blade station — operator viewpoint</p>
                    </div>

                    <div className="border border-gray-200 rounded-md p-4 flex flex-col items-center">
                        <div className="h-40 w-full bg-gray-50 border border-dashed border-gray-200 rounded-md flex items-center justify-center">
                            <span className="text-gray-400">Image placeholder: Microscope view</span>
                        </div>
                        <p className="mt-3 text-sm text-gray-500">Microscope inspection of blades</p>
                    </div>
                </div>
            </section>

            {/* Method */}
            <section className="max-w-6xl mx-auto mb-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-medium mb-2">Method</h3>
                        <ul className="text-gray-600 list-disc list-inside space-y-2">
                            <li>Time study: 10 cycles, 3 blade sizes (5mm, 10mm, 15mm)</li>
                            <li>FMEA risk analysis: 6 major risks identified</li>
                            <li>Process mapping: blade break → degreasing → inspection</li>
                            <li>Takt time calculation: 13.47 sec/blade, monthly demand 122,000 blades</li>
                        </ul>

                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="col-span-1">
                                <div className="h-24 bg-gray-50 border border-dashed border-gray-200 rounded-md flex items-center justify-center text-sm text-gray-400">
                                    Process flow
                                </div>
                            </div>
                            <div>
                                <div className="h-24 bg-gray-50 border border-dashed border-gray-200 rounded-md flex items-center justify-center text-sm text-gray-400">
                                    Time study table
                                </div>
                            </div>
                            <div>
                                <div className="h-24 bg-gray-50 border border-dashed border-gray-200 rounded-md flex items-center justify-center text-sm text-gray-400">
                                    Balance chart
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Time study snapshot & FMEA summary */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-medium mb-2">Time Study (sample)</h3>

                        <div className="overflow-x-auto border rounded-md">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-100 text-gray-700">
                                    <tr>
                                        <th className="px-3 py-2 text-left">Cycle</th>
                                        <th className="px-3 py-2 text-left">5mm (s)</th>
                                        <th className="px-3 py-2 text-left">10mm (s)</th>
                                        <th className="px-3 py-2 text-left">15mm (s)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[1,2,3,4,5,6,7,8,9,10].map(i => (
                                        <tr key={i} className="odd:bg-white even:bg-gray-50">
                                            <td className="px-3 py-2">{i}</td>
                                            <td className="px-3 py-2">12.{(i%7).toString()}</td>
                                            <td className="px-3 py-2">13.{(i%5).toString()}</td>
                                            <td className="px-3 py-2">14.{(i%3).toString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4">
                            <h4 className="text-sm font-medium">FMEA summary</h4>
                            <ul className="text-gray-600 text-sm mt-2 list-disc list-inside">
                                <li>6 major risks: blade break, contamination, misalignment, PPE non-compliance, degreasing overflow, inspection miss</li>
                                <li>Mitigations proposed and prioritized by occurrence & severity</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Insights */}
            <section className="max-w-6xl mx-auto mb-10 bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-medium mb-4">Insights</h2>
                <p className="text-gray-600 mb-4">Key discoveries from analysis and time study</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Insight Card 1 */}
                    <div className="border border-gray-200 rounded-md p-4 flex flex-col">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-50 rounded-md">
                                {/* simple icon */}
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-indigo-600">
                                    <path d="M12 2v20" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M5 9h14" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <h4 className="font-medium">Blade break is bottleneck</h4>
                        </div>
                        <p className="text-gray-600 text-sm mt-3">Longest cycle time observed; causes downstream queuing and inspection backlog.</p>
                        <div className="mt-4 h-28 bg-gray-50 border border-dashed border-gray-200 rounded-md flex items-center justify-center text-sm text-gray-400">
                            Image placeholder: facility layout (bottleneck)
                        </div>
                    </div>

                    {/* Insight Card 2 */}
                    <div className="border border-gray-200 rounded-md p-4 flex flex-col">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-50 rounded-md">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M3 12h18" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
                                    <path d="M12 3v18" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </div>
                            <h4 className="font-medium">Motion waste in layout</h4>
                        </div>
                        <p className="text-gray-600 text-sm mt-3">Operators incur unnecessary walking for supplies and degreasing refill.</p>
                        <div className="mt-4 h-28 bg-gray-50 border border-dashed border-gray-200 rounded-md flex items-center justify-center text-sm text-gray-400">
                            Image placeholder: layout diagrams
                        </div>
                    </div>

                    {/* Insight Card 3 */}
                    <div className="border border-gray-200 rounded-md p-4 flex flex-col">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-50 rounded-md">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M3 6h18M3 12h18M3 18h18" stroke="#059669" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </div>
                            <h4 className="font-medium">Batch size variability</h4>
                        </div>
                        <p className="text-gray-600 text-sm mt-3">Different blade sizes show wide per-cycle throughput: 10mm ~160/cycle, 15mm ~100/cycle.</p>
                        <div className="mt-4 h-28 bg-gray-50 border border-dashed border-gray-200 rounded-md flex items-center justify-center text-sm text-gray-400">
                            Image placeholder: throughput / balance chart
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact */}
            <section className="max-w-6xl mx-auto mb-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium mb-3">Impact & Recommendations</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Layout optimization: reduced travel time for degreasing refill and supply access</li>
                        <li>PPE accessibility improvements & standardized placement</li>
                        <li>Waste consolidation points to remove unnecessary motion</li>
                        <li>Process documentation and standard work to reduce variability</li>
                    </ul>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="h-20 bg-gray-50 border border-dashed border-gray-200 rounded-md flex items-center justify-center text-sm text-gray-400">
                            Stations
                        </div>
                        <div className="h-20 bg-gray-50 border border-dashed border-gray-200 rounded-md flex items-center justify-center text-sm text-gray-400">
                            Layout before
                        </div>
                        <div className="h-20 bg-gray-50 border border-dashed border-gray-200 rounded-md flex items-center justify-center text-sm text-gray-400">
                            Layout after
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium mb-3">Metrics</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-gray-50 rounded-md">
                            <div className="text-sm text-gray-500">Takt time</div>
                            <div className="mt-1 text-xl font-semibold">13.47 sec/blade</div>
                        </div>

                        <div className="p-3 bg-gray-50 rounded-md">
                            <div className="text-sm text-gray-500">Monthly demand</div>
                            <div className="mt-1 text-xl font-semibold">122,000 blades</div>
                        </div>

                        <div className="p-3 bg-gray-50 rounded-md">
                            <div className="text-sm text-gray-500">Stations vs target</div>
                            <div className="mt-1 text-xl font-semibold">All stations below target</div>
                        </div>

                        <div className="p-3 bg-gray-50 rounded-md">
                            <div className="text-sm text-gray-500">Quality</div>
                            <div className="mt-1 text-xl font-semibold">Scrap reduction identified</div>
                        </div>

                        <div className="col-span-2 p-3 bg-gray-50 rounded-md">
                            <div className="text-sm text-gray-500">FMEA impact</div>
                            <div className="mt-1 text-xl font-semibold">Risk scores reduced (post-mitigation)</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Artifacts */}
            <section className="max-w-6xl mx-auto mb-20 bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-medium mb-3">Artifacts</h2>
                <p className="text-gray-600 mb-4">Deliverables included process documentation, FMEA matrix, layout recommendations and time study data (10 cycles).</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-1 border border-gray-200 rounded-md p-4">
                        <div className="h-28 bg-gray-50 border border-dashed border-gray-200 rounded-md flex items-center justify-center text-sm text-gray-400">
                            Process flow documentation
                        </div>
                    </div>

                    <div className="col-span-1 border border-gray-200 rounded-md p-4">
                        <div className="h-28 bg-gray-50 border border-dashed border-gray-200 rounded-md flex items-center justify-center text-sm text-gray-400">
                            FMEA risk matrix
                        </div>
                    </div>

                    <div className="col-span-1 border border-gray-200 rounded-md p-4">
                        <div className="h-28 bg-gray-50 border border-dashed border-gray-200 rounded-md flex items-center justify-center text-sm text-gray-400">
                            Time study data (10 cycles)
                        </div>
                    </div>
                </div>
            </section>

            <footer className="max-w-6xl mx-auto text-center text-sm text-gray-500">
                <div>Case study generated for presentation — technical & process-focused layout.</div>
            </footer>
        </main>
    );
}