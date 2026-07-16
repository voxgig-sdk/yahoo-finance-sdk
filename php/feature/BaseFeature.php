<?php
declare(strict_types=1);

// YahooFinance SDK base feature

class YahooFinanceBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(YahooFinanceContext $ctx, array $options): void {}
    public function PostConstruct(YahooFinanceContext $ctx): void {}
    public function PostConstructEntity(YahooFinanceContext $ctx): void {}
    public function SetData(YahooFinanceContext $ctx): void {}
    public function GetData(YahooFinanceContext $ctx): void {}
    public function GetMatch(YahooFinanceContext $ctx): void {}
    public function SetMatch(YahooFinanceContext $ctx): void {}
    public function PrePoint(YahooFinanceContext $ctx): void {}
    public function PreSpec(YahooFinanceContext $ctx): void {}
    public function PreRequest(YahooFinanceContext $ctx): void {}
    public function PreResponse(YahooFinanceContext $ctx): void {}
    public function PreResult(YahooFinanceContext $ctx): void {}
    public function PreDone(YahooFinanceContext $ctx): void {}
    public function PreUnexpected(YahooFinanceContext $ctx): void {}
}
