# frozen_string_literal: true

class MigrateHometownExclusiveListsToMastodon < ActiveRecord::Migration[7.0]
  def up
    List.where(is_exclusive: true).in_batches.update_all(exclusive: :is_exclusive)
    safety_assured { remove_column :lists, :is_exclusive }
  end
end
