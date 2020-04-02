module.exports = {
    verbose: true,
    rootDir: '.',
    preset: 'ts-jest',
    testMatch: ['<rootDir>././test/test.*.ts'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    testEnvironment: 'node',
    clearMocks: true,
};
