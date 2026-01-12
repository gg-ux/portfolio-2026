import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { Button, Input, Textarea } from './ui'
import { ArrowRight, CircleNotch, CheckCircle, WarningCircle } from '@phosphor-icons/react'

export default function ContactForm() {
  const { isDark } = useTheme()
  const [formState, setFormState] = useState('idle') // idle, submitting, success, error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message is too short'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) return

    setFormState('submitting')

    try {
      const response = await fetch('https://formspree.io/f/mykkyzdg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
          _subject: `Portfolio Contact: ${formData.subject}`,
        }),
      })

      if (response.ok) {
        setFormState('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  // Success state
  if (formState === 'success') {
    return (
      <div
        className={`rounded-2xl p-8 text-center ${
          isDark ? 'bg-white/[0.02] border border-white/[0.06]' : 'bg-black/[0.02] border border-black/[0.06]'
        }`}
      >
        <CheckCircle
          size={48}
          weight="light"
          className="mx-auto mb-4 text-emerald-400"
        />
        <h3 className={`font-satoshi text-xl mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Message sent!
        </h3>
        <p className={`font-satoshi mb-6 ${isDark ? 'text-white/60' : 'text-black/60'}`}>
          Thanks for reaching out. I'll get back to you soon.
        </p>
        <button
          onClick={() => setFormState('idle')}
          className={`font-mono text-[11px] tracking-wide uppercase transition-colors ${
            isDark ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'
          }`}
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name & Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          id="name"
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />

        <Input
          type="email"
          id="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
      </div>

      {/* Subject */}
      <Input
        id="subject"
        name="subject"
        label="Subject"
        value={formData.subject}
        onChange={handleChange}
        error={errors.subject}
      />

      {/* Message */}
      <Textarea
        id="message"
        name="message"
        label="Message"
        value={formData.message}
        onChange={handleChange}
        rows={4}
        error={errors.message}
      />

      {/* Error state */}
      {formState === 'error' && (
        <div className={`flex items-center gap-2 p-3 rounded-lg ${
          isDark ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'
        }`}>
          <WarningCircle size={18} className="text-red-400 flex-shrink-0" />
          <p className={`font-satoshi text-sm ${isDark ? 'text-red-300' : 'text-red-600'}`}>
            Something went wrong. Please try again or email me directly.
          </p>
        </div>
      )}

      {/* Submit */}
      <div className="pt-2 flex justify-end">
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={formState === 'submitting'}
          icon={formState === 'submitting'
            ? <CircleNotch size={13} className="animate-spin" />
            : <ArrowRight size={13} weight="regular" />
          }
        >
          {formState === 'submitting' ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </form>
  )
}
