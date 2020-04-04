module.exports = {
    verbose: true,
    rootDir: '.',
    preset: 'ts-jest',
    testMatch: ['<rootDir>././build/test/test.*.js'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    testEnvironment: 'node',
    clearMocks: true,
};
