/** @type {import('next').NextConfig} */
import withPwaInit from 'next-pwa'

const withPwa = withPwaInit({
    dest: 'public',
    register: true,
    sw: '/sw.js',
    scope: '/',
})

const nextConfig = {};

export default withPwa(nextConfig)
