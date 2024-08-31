export default {
    // ... other configurations
    output: {
        // ... other output options
        manualChunks(id) {
            if (id.includes('node_modules')) {
                return 'vendor';
            }
        },
        chunkFileNames: 'chunks/[name]-[hash].js', // Specify the format for chunk file names
        assetFileNames: 'assets/[name]-[hash][extname]', // Specify the format for asset file names
    },
};