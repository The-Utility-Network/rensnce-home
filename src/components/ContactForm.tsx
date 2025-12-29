'use client';

import { useEffect, useRef } from 'react';

export default function ContactForm() {
    const containerRef = useRef<HTMLDivElement>(null);
    const formSlug = "rensncedao-contact-form-f3a037b6";

    useEffect(() => {
        if (!containerRef.current) return;

        // Check if form already exists to prevent duplicate injection
        if (containerRef.current.querySelector('form')) return;

        const apiEndpoint = "https://crm.ledger1.ai/api/forms/submit";

        // TUC Core Theme
        const theme = {
            primaryColor: "#F54029",
            backgroundColor: "rgba(255, 255, 255, 0.03)", // Subtle glass
            textColor: "#ffffff",
            borderColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            fontFamily: "inherit",
            buttonTextColor: "#ffffff",
            labelColor: "#9ca3af", // gray-400
            inputBgColor: "rgba(0, 0, 0, 0.2)"
        };

        const form = document.createElement("form");
        form.id = "crm-form-" + formSlug;
        form.style.cssText = `display:grid; grid-template-columns: repeat(12, 1fr); column-gap: 20px; row-gap: 24px; width:100%; max-width:800px; margin:0 auto; font-family:${theme.fontFamily}; background:${theme.backgroundColor}; padding:40px; border-radius:${theme.borderRadius}; border: 1px solid ${theme.borderColor}; backdrop-filter: blur(10px);`;

        const fields = [
            { name: "first_name", label: "First Name", type: "text", required: true, placeholder: "Satoshi", span: 6 },
            { name: "last_name", label: "Last Name", type: "text", required: true, placeholder: "Nakamoto", span: 6 },
            { name: "email", label: "Email", type: "email", required: true, placeholder: "you@example.com", span: 6 },
            { name: "phone", label: "Phone", type: "phone", required: false, placeholder: "+1 555-123-4567", span: 6 },
            { name: "company", label: "Company / DAO", type: "text", required: false, placeholder: "Your organization or DAO name", span: 6 },
            { name: "website", label: "Website", type: "text", required: false, placeholder: "https://yourdomain.xyz", span: 6 },
            { name: "wallet_address", label: "Wallet Address (optional)", type: "text", required: false, placeholder: "0xabc...", span: 12 },
            { name: "inquiry_type", label: "How can we help?", type: "select", required: true, placeholder: null, span: 12 },
            { name: "country", label: "Country", type: "text", required: false, placeholder: "Country of residence or operation", span: 12 },
            { name: "message", label: "Message", type: "textarea", required: true, placeholder: "Tell us about your needs, goals, and timeline...", span: 12 }
        ];

        const allInputs: (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)[] = [];

        fields.forEach(function (field, index) {
            const wrapper = document.createElement("div");
            wrapper.style.gridColumn = `span ${field.span || 12}`;
            wrapper.style.display = "flex";
            wrapper.style.flexDirection = "column";

            const label = document.createElement("label");
            label.textContent = field.label + (field.required ? " *" : "");
            label.style.cssText = "display:block;margin-bottom:8px;font-weight:600;color:" + theme.labelColor + ";font-size:12px;letter-spacing: 0.05em;text-transform:uppercase;";
            wrapper.appendChild(label);

            let input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

            if (field.type === "textarea") {
                input = document.createElement("textarea");
                input.rows = 4;
            } else if (field.type === "select") {
                input = document.createElement("select");

                let options: string[] = [];
                if (field.name === 'inquiry_type') {
                    options = ["General Inquiry", "Partnership Opportunity", "Investment Interest", "Technical Integration", "DAO Membership", "MKVLI Token", "DIO/VRDI Questions", "Media/Press", "Other"];
                }

                const defaultOpt = document.createElement("option");
                defaultOpt.text = "Select...";
                defaultOpt.value = "";
                defaultOpt.disabled = true;
                defaultOpt.selected = true;
                input.appendChild(defaultOpt);

                options.forEach(opt => {
                    const el = document.createElement("option");
                    el.text = opt;
                    el.value = opt;
                    el.style.backgroundColor = "#1a1a1a";
                    el.style.color = theme.textColor;
                    input.appendChild(el);
                });
            } else {
                input = document.createElement("input");
                input.type = field.type === "email" ? "email" : field.type === "phone" ? "tel" : "text";
            }

            input.name = field.name;
            input.required = field.required;
            if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
                input.placeholder = field.placeholder || "";
            }

            // Input Styling
            input.style.cssText = `width:100%;padding:14px 16px;border:1px solid ${theme.borderColor};border-radius:8px;font-size:14px;background:${theme.inputBgColor};color:${theme.textColor};box-sizing:border-box;outline:none;transition:all 0.2s ease;`;

            input.onfocus = () => {
                input.style.borderColor = theme.primaryColor;
                input.style.background = "rgba(0,0,0,0.5)";
            };
            input.onblur = () => {
                input.style.borderColor = theme.borderColor;
                input.style.background = theme.inputBgColor;
            };

            allInputs.push(input);
            wrapper.appendChild(input);
            form.appendChild(wrapper);
        });

        // Submit Button
        const submitWrapper = document.createElement("div");
        submitWrapper.style.gridColumn = "span 12";

        const submit = document.createElement("button");
        submit.type = "submit";
        submit.textContent = "SUBMIT";
        submit.style.cssText = `background:#ffffff;color:#000000;border:none;padding:16px 28px;border-radius:8px;cursor:pointer;font-size:14px;font-weight:700;width:100%;letter-spacing:0.1em;text-transform:uppercase;transition:all 0.2s;`;

        submit.onmouseover = () => { submit.style.background = "#e5e5e5"; };
        submit.onmouseout = () => { submit.style.background = "#ffffff"; };

        submitWrapper.appendChild(submit);
        form.appendChild(submitWrapper);

        // Submit Handler
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            submit.disabled = true;
            submit.textContent = "SUBMITTING...";
            submit.style.opacity = "0.7";

            const data: Record<string, any> = {};
            new FormData(form).forEach(function (v, k) { data[k] = v; });

            fetch(apiEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    form_slug: formSlug,
                    data: data,
                    source_url: window.location.href,
                    referrer: document.referrer
                })
            })
                .then((response) => {
                    // Show success for any response (CRM returns 200 with no body)
                    form.innerHTML = `<div style='grid-column:span 12;text-align:center;padding:60px;'><h3 style='color:${theme.primaryColor};font-size:24px;margin-bottom:12px;font-weight:bold;'>THANK YOU!</h3><p style='color:${theme.textColor};opacity:0.8;'>We will be in touch shortly.</p></div>`;
                })
                .catch(function () {
                    // CORS may block reading response but request still succeeds - show success anyway
                    form.innerHTML = `<div style='grid-column:span 12;text-align:center;padding:60px;'><h3 style='color:${theme.primaryColor};font-size:24px;margin-bottom:12px;font-weight:bold;'>THANK YOU!</h3><p style='color:${theme.textColor};opacity:0.8;'>We will be in touch shortly.</p></div>`;
                });
        });

        containerRef.current.appendChild(form);
    }, []);

    return <div id={"form-" + formSlug} ref={containerRef} className="w-full" />;
}
